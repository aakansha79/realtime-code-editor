import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { v4 as uuidV4 } from "uuid";
import logo from "../image.png";

const Home = () => {

  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();

    const id = uuidV4();

    setRoomId(id);

    toast.success("Created a new room");
  };

  const joinRoom = () => {

    if (!roomId || !username) {
      toast.error("Room ID & Username required");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (

    <div className="homePageWrapper">

      <div className="formWrapper">

        <img src={logo} alt="logo" className="homeLogo" />

        <h4>paste invitation ROOM ID</h4>

        <div className="inputGroup">

          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />

          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />

          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>

          <span className="createInfo">
            if you don't have an invite then create{" "}
            <a href="/" onClick={createNewRoom}>
              new room
            </a>
          </span>

        </div>

      </div>

      <footer>
        <h4>
          Build by <span>Aakansha</span>
        </h4>
      </footer>

    </div>

  );
};

export default Home;