import "./Home.css";
import React, { useState } from 'react';
import axios from "axios";

export default function Home(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const onChange = (e:any) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);

        axios.post('http://localhost:8080/api/v1/users/register', formData)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

        closeModal();
        setFormData({
            username: '',
            email: '',
            password: ''
        });
    };

    return(
        <div>
           <h1 className='heading ms-20 mt-10'>NOOKHUB</h1>
           <h2 className='mt-1 ms-20'>Watch, chat, and chill with your crew—enjoy videos together in just a few clicks! </h2>
            <button className="button ms-20 mt-10" onClick={openModal}>
                SignUp
            </button>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content bg-zinc-800" onClick={e => e.stopPropagation()}>
                        <h1 className="signUp">Sign Up</h1>
                        <form>
                            <div className="form-group">
                                <span>Username</span>
                                <input type="text" id="username" name="username" onChange={(e) => onChange(e)} required />
                            </div>
                            <div className="form-group">
                                <span>Email</span>
                                <input type="email" id="email" name="email" onChange={(e) => onChange(e)} required />
                            </div>
                            <div className="form-group">
                                <span>Password</span>
                                <input type="password" id="password" name="password" onChange={(e) => onChange(e)} required />
                            </div>
                            <div className="d-flex">
                            <button type="submit" className="submit-button" onClick={handleSubmit}>Submit</button>
                            <button className="close-button" onClick={closeModal}>Close</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            )}
        </div>
    )
}