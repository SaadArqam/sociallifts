import React from 'react'

const Contact = () => {
  return (
    <div className="bg-gray-100 p-4 rounded text-black">
      <h1>Contact Us</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Message:
          <textarea name="message" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Contact
