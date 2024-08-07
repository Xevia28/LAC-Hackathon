import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { Puff } from 'react-loader-spinner';
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

function SignupPage() {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);

    function handlePhoneEntry(e) {
        const value = e.target.value;
        const regex = /^[0-9]*$/;
        if (regex.test(value) && value.length <= 8) {
            setPhone(value);
        }
    }

    async function handleClick(e) {
        e.preventDefault();
        if (!name || !email || !phone || !password || !cpassword) {
            return toast.error('Please fill in all fields');
        }
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            return toast.error(`Invalid email: ${email}`);
        }
        if (phone.length < 8) {
            return toast.error('Phone number must be 8 digits long');
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return toast.error('Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character.');
        }
        if (password !== cpassword) {
            return toast.error("Passwords do not match");
        }

        setLoading(true);
        try {
            const res = await axios({
                method: "POST",
                url: "http://localhost:3001/api/v1/users/signup",
                headers: { "Access-Control-Allow-Origin": "*" },
                data: {
                    name,
                    email,
                    phone,
                    password
                }
            })
            if (res.data.status === "success") {
                toast.success("Account created successfully!")
                setTimeout(() => { navigate('/login'); }, 1500);
            } else {
                toast.error("An unexpected error occurred. Check console for more details" + res.data.error)
                console.error(res.data);
            }
        } catch (error) {
            toast.error("Error creating account. Check console for more details")
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
            <div className='signupContainer'>
                <ToastContainer />
                <form>
                    <div className="field">
                        <label>Name:</label>
                        <input type='text' onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className="field">
                        <label>Email:</label>
                        <input type='text' onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="field">
                        <label>Phone:</label>
                        <input type='text' onChange={(e) => handlePhoneEntry(e)} value={phone} />
                    </div>
                    <div className="field">
                        <label>Password:</label>
                        <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <div className="field">
                        <label>Confirm Password:</label>
                        <input type='password' onChange={(e) => setConfirmPass(e.target.value)} value={cpassword} />
                    </div>
                    <button onClick={handleClick}>Signup</button>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </form>
            </div>
        </>
    )
}

export default SignupPage
