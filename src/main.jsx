import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout } from './components'
import { Login, Signup, AllBlog, AddBlog, EditBlog, Blog } from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: '/all-blogs',
        element: (
          <AuthLayout authentication>
            <AllBlog />
          </AuthLayout>
        )
      },
      {
        path: '/add-blog',
        element: (
          <AuthLayout authentication>
            {" "}
            <AddBlog />
          </AuthLayout>
        )
      },
      {
        path: '/edit-blog/:slug',
        element: (
          <AuthLayout authentication>
            {" "}
            <EditBlog />
          </AuthLayout>
        )
      },
      {
        path: '/blog/:slug',
        element: <Blog />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
