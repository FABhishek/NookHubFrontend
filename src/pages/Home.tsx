import "./Home.css";
import { useRef, useState } from "react";
import Constants from "../shared/Constants";
import axios from "axios";
import { Button, TextField, Dialog } from "@mui/material";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   reset();
  // };

  // Query Params for uniqueness check (email or username)

  const navigateSignup = () => {
    navigate("/signUp");
  };

  return (
    <div>
      <h1 className="heading ms-20 mt-10">NOOKHUB</h1>
      <h2 className="mt-1 ms-20">
        Watch, chat, and chill with your crew—enjoy videos together in just a
        few clicks!{" "}
      </h2>
      <button className="button ms-20 mt-10" onClick={navigateSignup}>
        Signup
      </button>
    </div>
  );
}
