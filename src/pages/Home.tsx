import "./Home.css";
import { useRef, useState } from "react";
import Constants from "../shared/Constants";
import axios from "axios";
import { Button, TextField, Dialog } from "@mui/material";
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';

export default function Home() {
  const baseUrl = Constants.baseUrl;
  const pathRegister = Constants.register;
  const pathInputAvailable = Constants.inputAvailable;
  const usernamePattern = Constants.usernameRegex;
  const passwordPattern = Constants.passwordRegex;
  const emailPattern = Constants.emailRegex;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  // Query Params for uniqueness check (email or username)
  function getQueryParams(input: string, type: string) {
    return type === 'email' ? { email: input } : { username: input };
  }

  const uniqueInput = async (input: string, type: string): Promise<boolean> => {
    try {
      console.log('lets call');
      const response = await axios.get(`${baseUrl}/${pathInputAvailable}`, {
        params: getQueryParams(input, type),
      });
      return response.data.Valid;
    } catch (error) {
      console.error('Error checking input:', error);
      return false;
    }
  };

  const debouncedCheckInput = useRef(
    debounce(async (input: string, type: string) => {
      const isUnique = await uniqueInput(input, type);
      if (type === 'email') {
        if (!isUnique) {
          setError('email', { type: 'manual', message: 'Email already exists!' });
        } else {
          clearErrors('email');
        }
      } else {
        if (!isUnique) {
          setError('username', { type: 'manual', message: 'Username already exists!' });
        } else {
          clearErrors('username');
        }
      }
    }, 1000)
  ).current;


  const handleInputChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'email') {
      if(value.length === 0) {
        clearErrors('email');
      }
      else if (value.match(emailPattern)) {
        debouncedCheckInput(value, name);
      } 
      else {
        setError('email', { type: 'manual', message: Constants.invalidEmail });
      }
    } else if (name === 'username') {
      if(value.length === 0) {
        clearErrors('username');
      }
      else if (value.length >= 3) {
        debouncedCheckInput(value, name);
      } else {
        setError('username', { type: 'manual', message: Constants.errorUsername });
      }
    }
  };

  // Form submission logic
  const onSubmit = async (data: any) => {
    console.log('Form Data Submitted:', data);
    try {
      const response = await axios.post(`${baseUrl}/${pathRegister}`, data);
      console.log(response);
      closeModal();
    } catch (error) {
      console.error('Error submitting the form:', error);
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
        <form className="FormSignUp" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('username', {
              required: true,
              minLength: { value: 3, message: Constants.errorUsername },
              pattern: { value: usernamePattern, message: Constants.errorUsername },
            })}
            label="Username"
            variant="filled"
            onChange={handleInputChange}
            error={!!errors.username}
            helperText={errors.username?.message as string}
          />

          <TextField
            {...register('email', {
              required: true,
              pattern: { value: emailPattern, message: Constants.invalidEmail },
            })}
            type="email"
            label="Email"
            variant="filled"
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />

          <TextField
            {...register('password', {
              required: true,
              pattern: { value: passwordPattern, message: Constants.errorPassword },
            })}
            label="Password"
            type="password"
            variant="filled"
            error={!!errors.password}
            helperText={errors.password?.message as string}
          />

          <div className="performButtons">
            <Button
              className="close-button"
              variant="contained"
              onClick={closeModal}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="submit-button"
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              Submit
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
