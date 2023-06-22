import React from 'react';
import { motion } from 'framer-motion';
import "./Events.scss"

const Events = () => {
    return ( 
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .4 }}
        >
            <div className="events-wrapper">
                <h2> Events Page </h2>
            </div>
        </motion.div>
        );
}
 
export default Events;