import React, { useState } from 'react';
import { motion } from 'framer-motion';
import "./Dashboard.scss"

const Dashboard = () => {
    const [memberType, setMemberType] = useState("Teacher")
    
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: .2 }}
            className='dashboard-wrapper'
        >
            <div className="member-label-w">
                <label htmlFor="member-name">Profile Photo:</label>
                <img src="/public/portrait-2.png" alt="" className="member-photo" />
            </div>
            <div className="member-label-w">
                <label htmlFor="member-type">Member Type: </label>
                <div className="member-type">{ memberType !== null && memberType }</div>
            </div>
            <div className="member-label-w">
                <label htmlFor="member-name">Display Name:</label>
                <div className="member-name">Oliver M</div>
            </div>
            <div className="member-label-w">
                <label htmlFor="member-email">Email:</label>
                <div className="member-email">olivermiguel1129@gmail.com</div>
            </div>
            <div className="member-label-w">
                <label htmlFor="member-dob">Date of Birth:</label>
                <div className="member-dob">11/29/2000</div>
            </div>
            <button id='update-profile-btn'>Update Profile</button>
            <button id='log-out-btn'>Log out</button>
        </motion.div>
    );
}

export default Dashboard;