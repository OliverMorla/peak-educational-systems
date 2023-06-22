import React from 'react';
import { motion } from 'framer-motion';
import "./MemberBlog.scss"

const MemberBlog = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .2 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <div className="member-blog-wrapper">
                <div className="member-blog-title-w">
                    <div className="member-blog-t-l">
                        <h2> Member Blog </h2>
                        <button id="preferences-btn">Preferences</button>
                    </div>
                    <input type="text" name="search-input" id="search-input" placeholder='Search article/blog' />
                </div>
                <div className="blog-content-wrapper">
                    <div className="blog-template-w">
                        <h2 className="blog-title">Teachers are growing!</h2>
                        <p className="blog-date">April 24, 2023</p>
                        <h6 className="blog-category"> Math </h6>
                        <p className="blog-summary">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, similique vero.
                            Facere animi totam facilis soluta praesentium laborum molestiae ut voluptatum illo
                            voluptatem, qui molestias officia esse quia in dicta.
                        </p>
                        <button id="see-more-btn">See more</button>
                    </div>
                    <div className="blog-template-w">
                        <h2 className="blog-title">Math isn't as common</h2>
                        <p className="blog-date">April 23, 2023</p>
                        <h6 className="blog-category"> Math </h6>
                        <p className="blog-summary">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, similique vero.
                            Facere animi totam facilis soluta praesentium laborum molestiae ut voluptatum illo
                            voluptatem, qui molestias officia esse quia in dicta.
                        </p>
                        <button id="see-more-btn">See more</button>
                    </div>
                    <div className="blog-template-w">
                        <h2 className="blog-title">Mathematicians are currently taking over the world</h2>
                        <p className="blog-date">April 23, 2023</p>
                        <h6 className="blog-category"> Math </h6>
                        <p className="blog-summary">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, similique vero.
                            Facere animi totam facilis soluta praesentium laborum molestiae ut voluptatum illo
                            voluptatem, qui molestias officia esse quia in dicta.
                        </p>
                        <button id="see-more-btn">See more</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default MemberBlog;