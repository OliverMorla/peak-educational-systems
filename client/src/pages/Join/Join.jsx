import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import "./Join.scss"

const Join = () => {
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{ delay: .2 }}
        >        
        <div className="join-wrapper">
            <form action="">
                <div className="input-w">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name-j" placeholder='Enter name'/>
                </div>
                <div className="input-w">
                    <label htmlFor="name">Email</label>
                    <input type="text" name="email" id="email-j" placeholder='Enter name'/>
                </div>
                <div className="input-w">
                    <label htmlFor="name">Password</label>
                    <input type="password" name="password" id="password-j" placeholder='Enter password'/>
                </div>
                <div className="input-w">
                    <label htmlFor="name">Password Confirmation</label>
                    <input type="password" name="password-confirm" id="password-confirm-j" placeholder='Enter password confirmation'/>
                </div>
                <button type="submit" id='create-account-btn'>Create account</button>
                
            </form>
            <button id='login-instead-btn'><Link to={"/user/login"}>Login</Link></button>
        </div>
        </motion.div>
    );
}

export default Join;