import React from 'react'

function Button({
    children,
    type = 'button',
    className = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold ${className}`} type={type} {...props}>
        {children}
    </button>
  )
}

export default Button