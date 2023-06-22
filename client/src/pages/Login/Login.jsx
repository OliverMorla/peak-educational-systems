import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import "./Login.scss"

const Login = () => {
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{ delay: .2 }}
        >        
        <div className="login-wrapper">
            <form action="">
                <div className="input-w">
                    <label htmlFor="name">Email</label>
                    <input type="text" name="email" id="email-l" placeholder='Enter name'/>
                </div>
                <div className="input-w">
                    <label htmlFor="name">Password</label>
                    <input type="password" name="password" id="password-l" placeholder='Enter password'/>
                </div>
                <button type="submit" id='login-account-btn'>Login</button>
            </form>
                <button id='join-instead-btn'><Link to={"/user/join"}>Become a Member</Link></button>
                <button id='forgot-password-btn'>Forgot Password</button>
        </div>
        </motion.div>
    );
}

export default Login;