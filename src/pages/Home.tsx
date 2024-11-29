import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Dialog } from "@mui/material";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [userNameError, setUserNameError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setUserNameError("");
    setIsPasswordValid("");
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  // callbacks
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isAlphaNumeric = (data: any) => {
    if (data === "") return true;
    const pattern =
      /^(?!.*[_.]{2})[a-zA-Z0-9](?!.*[_.]$)[a-zA-Z0-9_.]{1,18}[a-zA-Z0-9]$/;
    return pattern.test(data);
  };

  const validateUserName = (username: any) => {
    if (username.length < 3 || username.length > 50) {
      setUserNameError(
        "Username should be of minimum 3 letters and not more than 50."
      );
      return false;
    } else if (!isAlphaNumeric(username)) {
      setUserNameError("Username should be alphanumeric.");
      return false;
    } else {
      setUserNameError("");
      return true;
    }
  };

  const ValidatePassword = (data: string) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/`~]{8,20}$/;

    if (!pattern.test(data)) {
      setIsPasswordValid(
        "Password must be 8–20 characters with at least one uppercase, one lowercase, one number, and one special character."
      );
      return false;
    } else {
      setIsPasswordValid("");
      return true;
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    //validating data first.
    //validateUserName(formData.username);
    if (
      validateUserName(formData.username) &&
      ValidatePassword(formData.password)
    ) {
      axios
        .post("http://localhost:8080/api/v1/users/register", formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      closeModal();
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div>
      <h1 className="heading ms-20 mt-10">NOOKHUB</h1>
      <h2 className="mt-1 ms-20">
        Watch, chat, and chill with your crew—enjoy videos together in just a
        few clicks!{" "}
      </h2>
      <button className="button ms-20 mt-10" onClick={openModal}>
        SignUp
      </button>

      <Dialog open={isModalOpen}>
        <form className="FormSignUp" onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            variant="filled"
            value={formData.username}
            required
            onChange={(e) => onChange(e)}
          ></TextField>
          {userNameError && <span className="error">{userNameError}</span>}
          <TextField
            name="email"
            type="email"
            label="Email"
            variant="filled"
            value={formData.email}
            required
            onChange={(e) => onChange(e)}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            variant="filled"
            value={formData.password}
            required
            onChange={(e) => onChange(e)}
          />
          {isPasswordValid && <span className="error">{isPasswordValid}</span>}
          <div className="performButtons">
            <Button
              className="close-button"
              variant="contained"
              onClick={closeModal}
            >
              Close
            </Button>
            <Button type="submit" variant="contained" className="submit-button">
              Submit
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
