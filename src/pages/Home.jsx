import React, { useEffect, useState } from 'react'
import { Container, BlogCard } from '../components'
import dbService from '../appwrite/dbConfig'

function Home() {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        dbService.getAllPost().then((blogs) => {
            if (blogs) {
                setBlogs(blogs.documents)
            }
        })
    }, [])

    if (blogs.length === 0) {
        return (
            <div className="w-full py-8 mt-10 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full mt-40">
                            <h1 className="text-2xl font-bold">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8 mt-10'>
            <Container>
                <div className='flex flex-wrap'>
                    {blogs.map((blog) => (
                        <div key={blog.$id} className='p-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                            <BlogCard {...blog}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}

export default Home