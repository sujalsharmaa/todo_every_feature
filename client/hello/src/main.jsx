import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Table from './components/Table.jsx'
import FileUpload from './components/File.jsx'
import FileUploads from './components/Files.jsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Table/>
  },
  {
    path: "/uploadFile",
    element: <FileUpload/>
  },
  {
    path: "/uploadFiles",
    element: <FileUploads/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <RouterProvider router={router}/>
    <App />
  </React.StrictMode>
  </QueryClientProvider>
  
)
