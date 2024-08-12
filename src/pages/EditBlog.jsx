import React, { useEffect, useState } from 'react'
import { Container, BlogForm } from '../components'
import dbService from '../appwrite/dbConfig'
import { useNavigate, useParams } from 'react-router-dom'

function EditBlog() {
    const [blog, setBlog] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            dbService.getPost(slug).then((blog) => {
                setBlog(blog)
            })
        }else{
            navigate('/')
        }
    }, [slug, navigate])
    
  return blog ? (
    <div className='py-8 mt-16'>
        <Container>
            <BlogForm blog={blog}/>
        </Container>
    </div>
  ) : null;
}

export default EditBlog