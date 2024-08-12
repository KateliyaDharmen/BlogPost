import React, { useEffect, useState } from 'react'
import dbService from '../appwrite/dbConfig'
import { Container, BlogCard } from '../components'

function AllBlog() {
    const [posts, setPosts] = useState([])

    useEffect(() => {}, [])

    dbService.getAllPost([]).then((Blogs) => {
        if (Blogs) {
            setPosts(Blogs.documents)
        }
    })
    return (
        <div className='w-full py-8 mt-10'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((blog) => (
                        <div key={blog.$id} className='p-2 w-1/4'>
                            <BlogCard {...blog} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllBlog