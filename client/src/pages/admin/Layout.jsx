import React from 'react';
import { Outlet} from 'react-router-dom';
import { assets } from '../../assets/assets';
import SideBar from '../../components/admin/SideBar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {

   const { axios, setToken, navigate } = useAppContext()

const logout = () => {
  localStorage.removeItem('token');
  axios.defaults.headers.common['Authorization'] = null;
  setToken(null)
  navigate('/')
}
    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center py-3 px-6 bg-white border-b border-gray-200">
                <img
                    src={assets.logo}
                    alt="Quickblog Logo"
                    className="w-32 sm:w-36 cursor-pointer"
                    onClick={() => navigate('/admin/dashboard')} // Navigate to admin dashboard
                />
                <button
                    onClick={logout}
                    className="bg-indigo-600 text-white text-sm font-medium px-6 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                    Logout
                </button>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                <SideBar />
                {/* The Outlet will render the specific page content */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;