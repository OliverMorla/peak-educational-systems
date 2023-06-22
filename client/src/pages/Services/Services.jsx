import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import "./Services.scss"

const Services = () => {
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}>        
        <div className="services-wrapper">
            <h2> Services Page </h2>
        </div>
        </motion.div>
     );
}

export default Services;