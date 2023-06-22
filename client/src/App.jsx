import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import About from './pages/About/About';
import Blog from './pages/Blog/Blog';
import TeacherBlog from './pages/TeacherBlog/TeacherBlog';
import MemberBlog from './pages/MemberBlog/MemberBlog';
import Contact from './pages/Contact/Contact';
import Join from './pages/Join/Join';
import Error from './pages/Error/Error';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ScheduleMeeting from './pages/ScheduleMeeting/ScheduleMeeting';
import Testimonials from './pages/Testimonials/Testimonials';
import Privacy from './pages/Privacy/Privacy';
import Events from './pages/Events/Events';
import "./App.scss"
import Team from './pages/Team/Team';


const Root = () => {
    return (
        <div className="wrapper">
            <Navbar />
            <div className="content-wrapper">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

const BlogRoot = () => {
    return (
        <>
            <Outlet />
        </>
    );
}

const UserRoot = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

const router = createBrowserRouter(
    [{
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [{
            path: '/',
            element: <Home />,
            errorElement: <Error />
        },
        {
            path: "/services",
            element: <Services />,
            errorElement: <Error />,
        },
        {
            path: "/about",
            element: <About />,
            errorElement: <Error />,
        },
        {
            path: "/testimonials",
            element: <Testimonials />,
            errorElement: <Error />,
        },
        {
            path: "/privacy",
            element: <Privacy />,
            errorElement: <Error />,
        },
        {
            path: "/events",
            element: <Events />,
            errorElement: <Error />,
        },
        {
            path: "/team",
            element: <Team />,
            errorElement: <Error />,
        },
        {
            path: "/blog",
            element: <BlogRoot />,
            errorElement: <Error />,
            children: [{
                path: '/blog',
                element: <Blog />,
                errorElement: <Error />
            },
            {
                path: "/blog/teachers",
                element: <TeacherBlog />,
                errorElement: <Error />
            },
            {
                path: "/blog/members",
                element: <MemberBlog />,
                errorElement: <Error />
            }]
        },
        {
            path: "/contact",
            element: <Contact />,
            errorElement: <Error />,
        },
        {
            path: "/user",
            element: <UserRoot />,
            errorElement: <Error />,
            children: [{
                path: "/user/dashboard",
                element: <Dashboard />,
                errorElement: <Error />
            },
            {
                path: "/user/join",
                element: <Join />,
                errorElement: <Error />
            },
            {
                path: "/user/login",
                element: <Login />,
                errorElement: <Error />
            },
            {
                path: '/user/schedule-a-meeting',
                element: <ScheduleMeeting />,
                errorElement: <Error />
            }]
        }]
    },
    ])

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;