import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/dbConfig";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Blog() {
    const [blog, setBlog] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = blog && userData ? blog.user_id === userData.$id : false;
    // console.log(userData, blog)
    useEffect(() => {
        if (slug) {
            dbService.getPost(slug).then((blog) => {
                if (blog) setBlog(blog);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deleteBlog = () => {
        dbService.deletePost(blog.$id).then((status) => {
            if (status) {
                dbService.deleteFile(blog.featuredimage);
                navigate("/");
            }
        });
    };

    return blog ? (
        <div className="py-8 mt-16">
            <Container>
                <div className="bg-gray-900 text-yellow-400 p-4 shadow-xl rounded-lg">
                    <div className="w-full mb-4 relative rounded-xl p-2 bg-gray-900 text-yellow-400 ">
                        <img
                            src={dbService.previewFile(blog.featuredimage)}
                            alt={blog.title}
                            className="rounded-xl h-48 object-right mb-4"
                        />
                        <div className="border-b-[2px] border-gray-800 w-full mt-10"></div>
                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-blog/${blog.$id}`}>
                                    <Button className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button onClick={deleteBlog}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="w-full mb-6">
                        <h1 className="text-2xl font-bold ">{blog.title}</h1>
                    </div>
                    <div className="text-lg text-left">
                        {parse(blog.content)}
                    </div>
                </div>

            </Container>
        </div>
    ) : null;
}