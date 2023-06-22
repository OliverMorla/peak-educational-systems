import React from 'react';
import { motion } from 'framer-motion';
import "./Testimonials.scss"

const Testimonials = () => {
    return ( 
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .4 }}
        >
            <div className="testimonials-wrapper">
                <h2> Testimonials Page </h2>
            </div>
        </motion.div>
        );
}
 
export default Testimonials;