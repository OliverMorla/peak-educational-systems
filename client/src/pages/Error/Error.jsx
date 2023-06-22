import React from 'react';
import { motion } from 'framer-motion';

function Error() {
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}>        
        <div className="error-wrapper">
            <h2> Error Page </h2>
        </div>
        </motion.div>
    );
}

export default Error;