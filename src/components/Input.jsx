import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full text-left'>
            {label && <label
                className='inline-block mb-2 pl-1 text-yellow-400 font-semibold'
                htmlFor={id}
            >
                {label}
            </label>
            }
            <input
                type={type}
                className={`px-4 py-3 rounded-lg bg-gray-900 text-gray-200 outline-none focus:bg-gray-800 focus:text-white duration-200 w-full ${className}`}
                ref={ref}
                {...props}
                id = {id}
            />
        </div>
    )
})

export default Input