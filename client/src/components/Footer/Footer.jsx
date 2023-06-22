import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { motion } from 'framer-motion';
import "./Footer.scss"

const Footer = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <footer className="footer-wrapper">
                <div className="footer-wrapper-top">
                    <div className="about-us-wrapper">
                        <h3 className="about-us-title">About Us</h3>
                        <p className="about-us-info">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi saepe voluptate, quaerat, velit debitis nesciunt cumque maxime sunt consequatur vel ab excepturi accusantium? Excepturi obcaecati possimus cum sed officiis sunt!
                        </p>
                    </div>
                    <div className="features-wrapper">
                        <h3 className="features-title">Features</h3>
                        <div className="features-list-w">
                            <div className="feature-item"><Link to={'/about'}>About Us</Link></div>
                            <div className="feature-item"><Link to={'/services'}>Services</Link></div>
                            <div className="feature-item"><Link to={'/testimonials'}>Testimonials</Link></div>
                            <div className="feature-item"><Link to={'/contact'}>Contact Us</Link></div>
                            <div className="feature-item"><Link to={'/privacy'}>Privacy</Link></div>
                        </div>
                    </div>
                    <div className="contact-us-wrapper">
                        <div className="contact-us-section">
                            <h3 className="contact-us-title">Contact Us</h3>
                            <div className="contact-icon-wrapper">
                                <FontAwesomeIcon icon={faFacebook} className='contact-icon' />
                                <FontAwesomeIcon icon={faTwitter} className='contact-icon' />
                                <FontAwesomeIcon icon={faInstagram} className='contact-icon' />
                                <FontAwesomeIcon icon={faLinkedin} className='contact-icon' />
                            </div>
                        </div>
                        <div className="newsletter-wrapper">
                            <h3 className="newsletter-title">Subscribe To Newsletter</h3>
                            <form action="">
                                <input type="text" name="email" id="email-n" placeholder='Enter Email' className='newsletter-textbox' />
                                <button type="submit" className='sub-btn'>Suscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="footer-wrapper-bottom">
                    <div className="copyright-wrapper">
                        Copyright ©2023 All rights reserved
                    </div>
                </div>
            </footer>
        </motion.div>
    );
}

export default Footer;