// // import React from 'react';
// // import { assets } from '../../assets/assets';
// // import { NavLink } from 'react-router-dom';

// // const SideBar = () => {
// //   return (
// //     <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
// //       <NavLink
// //         end={true}
// //         to="/admin"
// //         className={({ isActive }) =>
// //           `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
// //             isActive ? "bg-primary/10 border-r-4 border-primary" : ""
// //           }`
// //         }
// //       >
// //         <img src={assets.home_icon} alt="Dashboard" className="min-w-4 w-5" />
// //         <p className="hidden md:inline-block">Dashboard</p>
// //       </NavLink>

// //       <NavLink
// //         to="/admin/AddBlogs"
// //         className={({ isActive }) =>
// //           `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
// //             isActive ? "bg-primary/10 border-r-4 border-primary" : ""
// //           }`
// //         }
// //       >
// //         <img src={assets.add_icon} alt="Add Blog" className="min-w-4 w-5" />
// //         <p className="hidden md:inline-block">Add Blog</p>
// //       </NavLink>

// //       <NavLink
// //         to="/admin/listBlog"
// //         className={({ isActive }) =>
// //           `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
// //             isActive ? "bg-primary/10 border-r-4 border-primary" : ""
// //           }`
// //         }
// //       >
// //         <img src={assets.list_icon} alt="Blog List" className="min-w-4 w-5" />
// //         <p className="hidden md:inline-block">Blog List</p>
// //       </NavLink>

// //       <NavLink
// //         to="/admin/comments"
// //         className={({ isActive }) =>
// //           `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
// //             isActive ? "bg-primary/10 border-r-4 border-primary" : ""
// //           }`
// //         }
// //       >
// //         <img src={assets.comment_icon} alt="Comments" className="min-w-4 w-5" />
// //         <p className="hidden md:inline-block">Comments</p>
// //       </NavLink>
// //     </div>
// //   );
// // };

// // export default SideBar;
// // src/components/admin/SideBar.jsx

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { assets } from '../../assets/assets';

// const SideBar = () => {
//   return (
//     <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
//       <NavLink
//         end
//         to="/admin"
//         className={({ isActive }) =>
//           `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
//             isActive ? "bg-primary/10 border-r-4 border-primary" : ""
//           }`
//         }
//       >
//         <img src={assets.home_icon} alt="Dashboard" className="min-w-4 w-5" />
//         <p className="hidden md:inline-block">Dashboard</p>
//       </NavLink>

//       <NavLink
//         to="/admin/AddBlogs"
//         className={({ isActive }) =>
//           `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
//             isActive ? "bg-primary/10 border-r-4 border-primary" : ""
//           }`
//         }
//       >
//         <img src={assets.add_icon} alt="Add Blog" className="min-w-4 w-5" />
//         <p className="hidden md:inline-block">Add Blog</p>
//       </NavLink>

//       <NavLink
//         to="/admin/listBlog"
//         className={({ isActive }) =>
//           `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
//             isActive ? "bg-primary/10 border-r-4 border-primary" : ""
//           }`
//         }
//       >
//         <img src={assets.list_icon} alt="Blog List" className="min-w-4 w-5" />
//         <p className="hidden md:inline-block">Blog List</p>
//       </NavLink>

//       <NavLink
//         to="/admin/comments"
//         className={({ isActive }) =>
//           `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
//             isActive ? "bg-primary/10 border-r-4 border-primary" : ""
//           }`
//         }
//       >
//         <img src={assets.comment_icon} alt="Comments" className="min-w-4 w-5" />
//         <p className="hidden md:inline-block">Comments</p>
//       </NavLink>
//     </div>
//   );
// };

// export default SideBar;
// src/components/admin/SideBar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const SideBar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      
      <NavLink
        end
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          }`
        }
      >
        <img src={assets.home_icon} alt="Dashboard" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink
        to="/admin/add-blog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          }`
        }
      >
        <img src={assets.add_icon} alt="Add Blog" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add Blog</p>
      </NavLink>

      <NavLink
        to="/admin/list-blog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          }`
        }
      >
        <img src={assets.list_icon} alt="Blog List" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Blog List</p>
      </NavLink>

      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          }`
        }
      >
        <img src={assets.comment_icon} alt="Comments" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
      
    </div>
  );
};

export default SideBar;
