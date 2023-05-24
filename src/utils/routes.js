import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Candidate/Home";
import Profile from "../pages/Candidate/Profile";
import Account from "../pages/Candidate/Account";
import RecHome from "../pages/Recruiter/Home";
import AddPosting from "../pages/Recruiter/AddPosting";
import Role from "../pages/auth/Role";

export const router = createBrowserRouter([
    {
        element: <Role />,
        path: '/'
    },
    {
        element: <Login />,
        path: '/:role/login'
    },
    {
        element: <Signup />,
        path: '/:role/signup'
    },
    {
        element: <Home />,
        path: '/candidate/:id/home'
    },
    {
        element: <Profile />,
        path: '/candidate/:id/profile'
    },
    {
        element: <Account />,
        path: '/candidate/:id/account'
    },
    {
        element: <RecHome />,
        path: `/recruiter/:id/home`
    },
    {
        element: <AddPosting />,
        path: `/recruiter/:id/addpost`
    },
])