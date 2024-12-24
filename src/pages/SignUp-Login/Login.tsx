import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Constants from "../../shared/Constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./Signup-login.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LogIn() {
  const baseUrl = Constants.baseUrl;
  const pathLogin = Constants.login;
  const navigate = useNavigate();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      email: null,
      password: null,
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  // Form submission logic
  const onSubmit = async (data: any) => {
    console.log("Form Data Submitted:", data);

    try {
      const response = await axios.post(`${baseUrl}/${pathLogin}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setValue("password", null);
      setValue("email", null);
      navigate("/dashboard");
      console.log(response);
    } catch (error) {
      setLoginError(error?.response?.data?.message);
      console.error("Error submitting the form:", error);
    }
  };

  const signUpHandle = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="outer-container">
        <div className="form-wrapper">
          <div className="heading">Log In</div>
          <form className="FormSignUp" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("email", {
                required: true,
              })}
              type="email"
              label="Email"
              variant="filled"
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />
            <TextField
              {...register("password", {
                required: true,
              })}
              label="Password"
              type={passwordVisibility ? "text" : "password"}
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors.password}
              helperText={errors.password?.message as string}
            />
            <div className="performButtons">
              <Button
                type="submit"
                variant="contained"
                className="submit-button"
                disabled={isSubmitting || Object.keys(errors).length > 0}
              >
                Log In
              </Button>
            </div>
            {loginError && (
              <p style={{ color: "red", marginTop: "8px" }}>{loginError}</p>
            )}
            <div className="loginCheck">
              Don't have an account?
              <span className="login" onClick={signUpHandle}>
                {" "}
                Sign Up
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
