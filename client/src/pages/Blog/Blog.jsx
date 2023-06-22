import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import "./Blog.scss"

function Blog() {
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: .2}}
        >         
        <div className="blog-wrapper">
            <h2> Blog Page </h2>
            <div className="blog-type-wrapper">
                <Link to={'/blog/teachers'}> Teachers </Link>
                <Link to={'/blog/members'}> Members </Link>
            </div>
        </div>
        </motion.div>
    );
}

export default Blog;