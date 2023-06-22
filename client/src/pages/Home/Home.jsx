import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
// import app from '../../hooks/firebase';
import "./Home.scss"

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .4 }}
            className="home-animation-wrapper"
        >
            <div className="home-wrapper">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: .6 }}
                    className="h-background-w">
                    <FontAwesomeIcon icon={faArrowLeft} className='fa-arrow-left' />
                    <FontAwesomeIcon icon={faArrowRight} className='fa-arrow-right' />
                    <div className="h-quote-w">
                        <div className="diamond-upper-arrow"></div>
                        <p className='h-quote-text'>
                            "Be dedicated to change the way in which people see mental illness
                            at all levels of society. If not for yourself, advocate for those
                            who are struggling in silence.” — Germany Kent
                        </p>
                        <div className="diamond-lower-arrow"></div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: .8 }}
                        className="h-badges-w">
                        <div className="badge-wrapper-1">
                            <img src="/c-logo/member-badge.png" alt="" className='badge-1' />
                        </div>
                        <div className="badge-wrapper-2">
                            <img src="/c-logo/voted-badge.png" alt="" className='badge-2' />
                        </div>
                    </motion.div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: .10 }}
                    className="h-bottom-section-w">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="our-mission-w">
                        <h2 className="our-mission-text">Our Mission</h2>
                        <div className="diamond-arrow"></div>
                        <p className="our-mission-desc">
                            Peak Educational Systems was founded in 2004. Its mission was to
                            provide academic support and engagement to elementary school aged
                            children and consulting services for parents seeking guidance on
                            how to best meet their child's academic needs. Since its inception,
                            Peak Educational Systems has expanded that mission by providing support
                            for novice teachers while focusing on the importance of childhood literacy
                            via writing for publication and circulating its literary works into
                            the world. We believe that children from all backgrounds should have
                            access to, and engagement with, diverse, high quality literature.
                        </p>
                    </motion.div>
                    <motion.img src="/c-logo/c-logo-3.png" alt=""
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        className='c-logo-3' />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6 }}
                        className="h-dialog-w">
                        <div className="h-dialog-left-w">
                            <div className="h-dialog-t">Blogs</div>
                            <div className="h-dialog-t">Events</div>
                            <div className="h-dialog-t">Meetings</div>
                        </div>
                        <div className="h-dialog-right-w">
                            <div className="dialog-detail-w">
                                {/* <img src="" alt="" /> */}
                                <p>
                                    Attend monthly workshops, webinars, and coaching sessions from industry leaders
                                </p>
                            </div>
                            <div className="dialog-detail-w">
                                {/* <img src="" alt="" /> */}
                                <p>
                                    Make friends with Memberships members through social activities
                                </p>
                            </div>
                            <div className="dialog-detail-w">
                                {/* <img src="" alt="" /> */}
                                <p>
                                    Secure the bag at our annual career fairs
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Home;