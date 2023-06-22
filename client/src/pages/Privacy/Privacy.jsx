import React from 'react';
import { motion } from 'framer-motion';
import "./Privacy.scss"

const Privacy = () => {
    return ( 
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .4 }}
        >
            <div className="privacy-wrapper">
                <h2> Privacy Page </h2>
            </div>
        </motion.div>
        );
}
 
export default Privacy;