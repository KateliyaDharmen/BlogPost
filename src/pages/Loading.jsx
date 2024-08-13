import React from 'react'

function Loading({message}) {
  return (
    <div className='flex items-center justify-center h-96 bg-gradient-to-r from-indigo-500 to-purple-500'>
            <div className='text-center'>
                <svg className="animate-spin h-10 w-10 text-white mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <h2 className="text-2xl text-white font-bold leading-tight">
                    {message}
                </h2>
            </div>
        </div>
  )
}

export default Loading