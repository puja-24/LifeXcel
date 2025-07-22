import React from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

// 1. Add `onUpdate` to the props list
const BlogTableItem = ({ blog, fetchBlogs, index, onUpdate }) => {
  const { title, createdAt, isPublished } = blog;
  const blogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm('Are you sure you want to delete this blog?');
    if (!confirm) return;
    try {
      const { data } = await axios.post('/api/blog/delete', { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs(); // Refreshes the blog list
        if (onUpdate) {
            await onUpdate();   // Refreshes other data, like the dashboard
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // The commented-out function has been removed for clarity

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <span className={isPublished ? "text-green-600" : "text-orange-600"}>
          {isPublished ? "Published" : "Unpublished"}
        </span>
      </td>
      <td className="px-2 py-4 flex items-center gap-3 text-sm">
        <button onClick={togglePublish} className="text-blue-600 hover:underline">
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          src={assets.cross_icon}
          className="w-5 h-5 hover:scale-110 transition-all cursor-pointer"
          alt=" " onClick={deleteBlog}
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;