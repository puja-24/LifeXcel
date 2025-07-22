import React, { useState, useMemo } from "react";
// Correctly import framer-motion for layoutId animations
import { motion } from "motion/react"
// Import your assets and components
import { blogCategories } from "../assets/assets";
import BlogCard from "./BlogCard";
// Import the missing context hook
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  // Get blogs and search input from the context
  const { blogs, input } = useAppContext();

  // Use useMemo to efficiently calculate the final list of blogs to display
  const finalFilteredBlogs = useMemo(() => {
    // 1. First, filter by the search input
    const searchedBlogs =
      input === ""
        ? blogs
        : blogs.filter(
            (blog) =>
              blog.title.toLowerCase().includes(input.toLowerCase()) ||
              blog.category.toLowerCase().includes(input.toLowerCase())
          );

    // 2. Then, filter the result by the selected category menu
    return menu === "All"
      ? searchedBlogs
      : searchedBlogs.filter((blog) => blog.category === menu);
  }, [input, blogs, menu]); // Re-run only when input, blogs, or menu changes

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-10 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8 mx-8 mb-24 sm:mx-16 xl:mx-40">
        {/* Map over the final, memoized list */}
        {finalFilteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;