import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { Puff } from 'react-loader-spinner';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleClick(e) {
        e.preventDefault();
        if (!email || !password) {
            return toast.error('Please fill in all fields');
        }
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            return toast.error(`Invalid email: ${email}`);
        }

        setLoading(true);
        try {
            const res = await axios({
                method: "POST",
                url: "http://localhost:3001/api/v1/users/login",
                headers: { "Access-Control-Allow-Origin": "*" },
                data: {
                    email,
                    password
                }
            })
            if (res.data.status === "success") {
                toast.success("Login successful!")
                console.log(res.data)
                // setTimeout(() => { navigate('/login'); }, 1500);
            } else {
                toast.error("An unexpected error occurred. Check console for more details" + res.data.error)
                console.error(res.data);
            }
        } catch (error) {
            toast.error("Error occurred while logging in. Check console for more details")
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            {loading && <div style={{ background: "white", display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%", position: "absolute", zIndex: "99999" }}>
                <Puff color="#00BFFF" height={550} width={80} />
            </div>}
            <div className='loginContainer'>
                <ToastContainer />
                <form>
                    <div className="field">
                        <label>Email:</label>
                        <input type='text' onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="field">
                        <label>Password:</label>
                        <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <button onClick={handleClick}>Login</button>
                    <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
                </form>
            </div>
        </>
    )
}

export default Login
