import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import "./Contact.scss"

function Contact() {
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: .2}}
        >        
        <div className="contact-wrapper">
            <div className="contact-title-w">
                <h2 className="contact-title">Contact Me</h2>
                <h3 className='contact-title-sub'>Get in touch</h3>
            </div>
            <form>
                <div className="name-wrapper-c">
                    <input type="text" name="first-name" id="first-name-c" placeholder='First name' required/>
                    <input type="text" name="last-name" id="last-name-c" placeholder='Last name' required/>
                </div>
                <input type="text" name="email" id="email-c" placeholder="Email address" required/>
                <textarea type="textarea" name="message" id="message-c" placeholder='Write your message.' required/>
                <button type="submit" id='contact-msg-btn'>Send Message</button>
            </form>
        </div>
        </motion.div>
    );
}

export default Contact;