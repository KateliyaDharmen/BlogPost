import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div
      className={`text-3xl font-extrabold tracking-wider bg-gradient-to-r from-yellow-400 via-purple-500 to-indigo-500 
      bg-clip-text text-transparent p-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-110`}
    >
      BlogPost
    </div>
  )
}

export default Logo