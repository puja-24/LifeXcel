import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Comments from './pages/admin/Comments.jsx'
import AddBlog from './pages/admin/AddBlog.jsx'
import ListBlog from './pages/admin/ListBlog.jsx'
import Layout from './pages/admin/Layout.jsx'
import Login from './components/admin/Login.jsx'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext.jsx'

const App = () => {

  const {token} = useAppContext()
  return (
    <div>
      <Toaster/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/blog/:id' element={<Blog/>}/>
  <Route path='/admin' element={token ? <Layout/>:<Login/>}>
  {/* // Define nested routes for the admin section
  // This will render the Dashboard component when the admin route is accessed */}
  <Route index element={<Dashboard />} />
  <Route path='list-blog' element={<ListBlog />} />
  <Route path='comments' element={<Comments />} />
    <Route path='add-blog' element={<AddBlog />} />
  </Route>
</Routes>
    </div>
  )
}

export default App
