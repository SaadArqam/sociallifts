import React from 'react'

const Navbar = () => {
  return (
    <div>
      <ul className="flex space-x-4 items-center justify-center">
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
        </li>
        <li>
          <a href="#" className="text-white-700 hover:text-blue-500">About</a>
        </li>
        <li>
          <a href="#" className="text-white-700 hover:text-blue-500">Services</a>
        </li>
        <li>
          <a href="#" className="text-white-700 hover:text-blue-500">Contact</a>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
