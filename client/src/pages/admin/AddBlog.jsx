import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import { assets, blogCategories } from '../../assets/assets';
import toast from 'react-hot-toast';
import {parse} from 'marked';

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  // Initialize Quill editor once on component mount
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write blog content here...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
          ],
        },
      });
    }
  }, []);

 const generateContent = async () => {
  if(!title) return toast.error('Please enter a title')

  try {
    setLoading(true);
    const {data} = await axios.post('/api/blog/generate', {prompt: title})
    if (data.success){
      quillRef.current.root.innerHTML = parse(data.content)
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
 toast.error(error.message)
  }
   finally { // <-- THIS BLOCK WAS ADDED TO FIX THE LOADING SPINNER
    setLoading(false); // This ensures the spinner always stops
  }
}
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    setIsAdding(true);
    try {
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML, // Read directly from ref
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const { data } = await axios.post('/api/blog/add', formData);

      if (data.success) {
        toast.success(data.message);
        // Reset form fields correctly
        setImage(null);
        setTitle('');
        setSubTitle('');
        quillRef.current.root.innerHTML = '';
        setCategory('');
        setIsPublished(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-gray-50 text-gray-700 h-full overflow-y-auto p-4 sm:p-8"
    >
      <div className="bg-white w-full max-w-3xl mx-auto p-6 md:p-8 shadow-md rounded-lg flex flex-col gap-5">
        
        {/* Upload thumbnail */}
        <div>
          <p className="font-medium">Upload thumbnail</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload"
              className="mt-2.5 h-24 w-40 rounded-md cursor-pointer object-cover border border-dashed border-gray-400 p-1"
            />
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </label>
        </div>

        {/* Title */}
        <div>
          <p className="font-medium">Blog title</p>
          <input
            type="text"
            placeholder="Type here"
            required
            className="w-full max-w-lg mt-2.5 p-2.5 border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Subtitle */}
        <div>
          <p className="font-medium">Sub title</p>
          <input
            type="text"
            placeholder="Type here"
            required
            className="w-full max-w-lg mt-2.5 p-2.5 border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-blue-500"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </div>

        {/* Blog Description (Quill) */}
        <div>
          <p className="font-medium">Blog Description</p>
          <div className="mt-2.5 h-72 pb-16 relative">
            <div ref={editorRef} className="h-full bg-white rounded-md border border-gray-300" />
            {loading && (
              <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
                <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>
                </div>
            )}
            <button
            disabled={loading}
              type="button"
              onClick={generateContent}
              className="absolute bottom-4 right-2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md hover:bg-gray-900"
            >
              Generate with AI
            </button>
          </div>
        </div>
        
        {/* Blog Category Dropdown */}
        <div>
          <p className="font-medium">Blog category</p>
          <select
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2.5 px-3 py-2.5 border text-gray-500 border-gray-300 outline-none rounded-md w-full max-w-lg focus:ring-2 focus:ring-blue-500"
            value={category}
            required
          >
            <option value="" disabled>Select category</option>
            {blogCategories.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* Publish Now Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="publish"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label htmlFor="publish" className="font-medium">Publish Now</label>
        </div>

        {/* Submit Button */}
        <button
          disabled={isAdding}
          type="submit"
          className="mt-4 bg-blue-600 text-white px-8 py-2.5 rounded-md hover:bg-blue-700 transition w-fit disabled:bg-blue-400"
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
