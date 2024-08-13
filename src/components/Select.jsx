import React, { useId } from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='inline-block mb-1 pl-1 text-yellow-500 font-semibold text-lg'>{label} :</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-4 py-3 rounded-lg bg-gray-900 outline-none focus:bg-gray-800 focus:text-white duration-200 w-full ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

        </div>
    )
}

export default React.forwardRef(Select)