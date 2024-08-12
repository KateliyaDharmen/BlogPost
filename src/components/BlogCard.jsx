import React from 'react'
import dbService from '../appwrite/dbConfig'
import {Link} from 'react-router-dom'

function BlogCard({$id, title, featuredimage}) {
  return (
    <Link to={`/blog/${$id}`}>
        <div className='w-full bg-gray-900 text-yellow-400 rounded-lg p-4 shadow-xl hover:transition-all duration-200 hover:shadow-2xl hover:scale-105'>
            <div className='w-full justify-center mb-4'>
                <img src={dbService.previewFile(featuredimage)} alt={title} className='rounded-lg h-44 w-full object-center' />
            </div>
            <h2 className='text-xl font-bold hover:text-indigo-400 text-center'>{title}</h2>
        </div>
    </Link>
  )
}

export default BlogCard