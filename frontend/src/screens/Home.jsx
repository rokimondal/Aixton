import React, { useState } from 'react'
import { IoIosCreate } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  return (
    <div className='min-h-screen bg-[#121212] w-full h-full'>
      <div className=' flex flex-wrap flex-row items-start gap-2 p-2 text-white'>
        <button className=' bg-[#1c1c1c] h-20 w-32 flex justify-center items-center text-3xl text-gray-500 rounded-md hover:shadow-lg hover:shadow-blue-600 ' onClick={() => setIsOpen(true)}><IoIosCreate /></button>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
        <div className='rounded-md bg-[#1c1c1c] h-20 w-32 flex items-center justify-center hover:shadow-md hover:shadow-blue-600 transition-transform duration-300 hover:scale-105 '><h5>hlw</h5></div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-gray-900 text-white p-6 rounded-md shadow-lg w-96 transition-transform scale-95 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Project</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>
            <form >
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white outline-none"
                placeholder="Enter project name"
              />
            </form>

          </div>
        </div>
      )}

    </div>
  )
}

export default Home