import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import dbService from '../../appwrite/dbConfig'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function BlogForm({ blog }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: blog?.title || '',
            slug: blog?.$id || '',
            content: blog?.content || '',
            status: blog?.status || 'active',
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        if (blog) {
            const file = data.image[0] ? await dbService.uploadFile(data.image[0]) : null;

            if (file) {
                dbService.deleteFile(blog.featuredimage);
            }

            const dbBlog = await dbService.editPost(blog.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined,
            })

            if (dbBlog) {
                navigate(`/blog/${dbBlog.$id}`)
            }
        } else {
            const file = await dbService.uploadFile(data.image[0]); //todo
            if (file) {
                console.log(data, userData)
                const fileId = file.$id;
                data.featuredimage = fileId;
                console.log(data.featuredimage)
                const dbBlog = await dbService.createPost({
                    ...data,
                    user_id: userData.$id,
                })
                if (dbBlog) {
                    navigate(`/blog/${dbBlog.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !blog })}
                />
                {blog && (
                    <div className="w-full mb-4">
                        <img
                            src={dbService.previewFile(blog.featuredimage)}
                            alt={blog.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={blog ? "bg-green-500" : undefined} className="w-full">
                    {blog ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default BlogForm