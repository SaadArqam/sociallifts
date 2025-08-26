import React from 'react'

const Contact = () => {
  return (
    <div className="bg-gray-100 p-4 rounded text-black">
      <h1 className='text-red-400 text-9xl font-bold font-coign text-center'>Contact Us</h1>
      <form className='flex flex-col space-y-4 text-center'>
        <label>
          Name:
          <input className='border p-2 rounded' type="text" name="name" placeholder='Enter your full name...'/>
        </label><br />
        <label>
          Email:
          <input className='border p-2 rounded' type="email" name="email" placeholder='Enter your email...'/>
        </label><br />
        <label>
          Message:
          <textarea className='border p-2 rounded' name="message" placeholder='Enter your message...' />
        </label><br />
        <button className='bg-blue-500 text-white p-2 rounded hover:cursor-pointer' type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Contact
