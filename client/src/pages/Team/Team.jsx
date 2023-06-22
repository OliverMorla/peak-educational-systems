import React from 'react';
import { motion } from 'framer-motion';
import "./Team.scss"

const Team = () => {
    return ( 
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .4 }}
        >
            <div className="team-wrapper">
                <h2> Team Page </h2>
            </div>
        </motion.div>
        );
}
 
export default Team;