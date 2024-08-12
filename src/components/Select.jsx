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
            {label && <label htmlFor={id} className='inline-block mb-1 pl-1 text-yellow-400 font-semibold'>{label} :</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-gray-800 text-gray-200 outline-none  focus:text-white duration-200 border w-full ${className}`}
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