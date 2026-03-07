import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Editor from "../components/Editor";
import { ACTIONS } from "../Actions";
import { initSocket } from "./socket";
import logo from "../image.png";

const EditorPage = () => {

  const socketRef = useRef(null);
  const codeRef = useRef(null);

  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);

  useEffect(() => {

    const init = async () => {

      socketRef.current = await initSocket();

      // connection error handling
      const handleErrors = (e) => {
        console.log("socket error", e);
        toast.error("Socket connection failed");
        navigate("/");
      };

      socketRef.current.on("connect_error", handleErrors);
      socketRef.current.on("connect_failed", handleErrors);

      // join room
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // when someone joins
      socketRef.current.on(ACTIONS.JOINED,
         ({ clients, username, socketId }) => {

        if (username !== location.state?.username) {
          toast.success(`${username} joined the room`);
        }

        setClients(clients);

        // sync code to new user
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        });

      });

      // when someone leaves
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {

        toast.success(`${username} left the room`);

        setClients((prev) =>
          prev.filter((client) => client.socketId !== socketId)
        );

      });

    };

    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };

  }, []);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied");
    } catch (err) {
      toast.error("Could not copy");
    }
  };

  const leaveRoom = () => {
    navigate("/");
  };

  return (
    <div className="mainWrap">

      {/* SIDEBAR */}
      <div className="aside">

        <div>

          <div className="logoSection">
            <img src={logo} alt="logo" />
            <div className="divider"></div>
          </div>

          <h3 className="connectedTitle">Connected</h3>

          <div className="clientsList">

            {clients.map((client) => (
              <div key={client.socketId} className="clientCard">

                <div className="avatar">
                  {client.username?.charAt(0).toUpperCase()}
                </div>

                <div className="username">
                  {client.username}
                </div>

              </div>
            ))}

          </div>

        </div>

        {/* FOOTER BUTTONS */}
        <div className="sidebarFooter">

          <button className="btn copyBtn" onClick={copyRoomId}>
            Copy ROOM ID
          </button>

          <button className="btn leaveBtn" onClick={leaveRoom}>
            Leave
          </button>

        </div>

      </div>

      {/* EDITOR AREA */}
      <div className="editorWrap">

        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />

      </div>

    </div>
  );
};

export default EditorPage;