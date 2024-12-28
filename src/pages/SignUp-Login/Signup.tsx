import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Constants from "../../shared/Constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import { debounce } from "lodash";
import "./Signup-login.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Signup() {
  const baseUrl = Constants.baseUrl;
  const pathRegister = Constants.register;
  const pathInputAvailable = Constants.inputAvailable;
  const usernamePattern = Constants.usernameRegex;
  const passwordPattern = Constants.passwordRegex;
  const emailPattern = Constants.emailRegex;
  const navigate = useNavigate();

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: {
      username: null,
      email: null,
      password: null,
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  function getQueryParams(input: string, type: string) {
    return type === "email" ? { email: input } : { username: input };
  }

  const uniqueInput = async (input: string, type: string): Promise<boolean> => {
    try {
      const response = await axios.get(`${baseUrl}/${pathInputAvailable}`, {
        params: getQueryParams(input, type),
      });
      return response.data.Valid;
    } catch (error) {
      console.error("Error checking input:", error);
      return false;
    }
  };

  const debouncedCheckInput = useRef(
    debounce(async (input: string, type: string) => {
      const isUnique = await uniqueInput(input, type);
      if (type === "email") {
        if (!isUnique) {
          setError("email", {
            type: "manual",
            message: "Email already exists!",
          });
        } else {
          clearErrors("email");
        }
      } else {
        if (!isUnique) {
          setError("username", {
            type: "manual",
            message: "Username already exists!",
          });
        } else {
          clearErrors("username");
        }
      }
    }, 1000)
  ).current;

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "email") {
      if (value.length === 0) {
        clearErrors("email");
      } else if (value.match(emailPattern)) {
        debouncedCheckInput(value, name);
      } else {
        setError("email", { type: "manual", message: Constants.invalidEmail });
      }
    } else if (name === "username") {
      if (value.length === 0) {
        clearErrors("username");
      } else if (value.length >= 3) {
        debouncedCheckInput(value, name);
      } else {
        setError("username", {
          type: "manual",
          message: Constants.errorUsername,
        });
      }
    }
  };

  // Form submission logic
  const onSubmit = async (data: any) => {
    console.log("Form Data Submitted:", data);
    try {
      const response = await axios.post(`${baseUrl}/${pathRegister}`, data);
      setValue("email", null);
      setValue("password", null);
      setValue("username", null);
      navigate("/dashboard");
      console.log(response);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const loginHandle = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="outer-container">
        <div className="form-wrapper">
          <div className="heading">Sign Up</div>
          <form className="FormSignUp" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("username", {
                required: true,
                minLength: { value: 3, message: Constants.errorUsername },
                pattern: {
                  value: usernamePattern,
                  message: Constants.errorUsername,
                },
              })}
              label="Username"
              variant="filled"
              onChange={handleInputChange}
              error={!!errors.username}
              helperText={errors.username?.message as string}
            />

            <TextField
              {...register("email", {
                required: true,
                pattern: {
                  value: emailPattern,
                  message: Constants.invalidEmail,
                },
              })}
              type="email"
              label="Email"
              variant="filled"
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />

            <TextField
              {...register("password", {
                required: true,
                pattern: {
                  value: passwordPattern,
                  message: Constants.errorPassword,
                },
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
                Sign Up
              </Button>
            </div>
            <div className="loginCheck">
              Already have an account?
              <span className="login" onClick={loginHandle}>
                {" "}
                Log In
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
