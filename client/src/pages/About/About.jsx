import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function About() {
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: .2}}
        >        
        <div className="about-wrapper">
            <h2> About Page </h2>
        </div>
        </motion.div>
    );
}

export default About;