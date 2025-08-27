import React from 'react'

const Contact = () => {
  return (
    <section id='contact' className='w-full min-h-screen py-20 bg-white'>
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero heading */}
        <h1 className='font-coign uppercase text-black text-center leading-[0.9] tracking-[-0.01em] text-[18vw] md:text-[12vw] lg:text-[10vw]'>
        We’re All Ears
        </h1>
        <p className='mt-4 text-center text-neutral-600'>
          Fill out the contact form below and tell us about your vision!
        </p>

        {/* Card form */}
        <div className='mt-10 bg-black/[0.04] rounded-3xl p-6 md:p-8 shadow-sm ring-1 ring-black/5'>
          <form className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex flex-col'>
              <label className='text-sm text-neutral-600 mb-2'>Name</label>
              <input className='h-11 rounded-xl border border-black/10 bg-white px-4 outline-none focus:border-black/30' type="text" name="name" placeholder='Will Smith' />
            </div>
            <div className='flex flex-col'>
              <label className='text-sm text-neutral-600 mb-2'>Email</label>
              <input className='h-11 rounded-xl border border-black/10 bg-white px-4 outline-none focus:border-black/30' type="email" name="email" placeholder='will@company.com' />
            </div>
            <div className='flex flex-col md:col-span-2'>
              <label className='text-sm text-neutral-600 mb-2'>About Project</label>
              <textarea className='rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 min-h-[120px]' name="message" placeholder="I'd like to..." />
            </div>
            <div className='md:col-span-2'>
              <button className='h-9 px-6 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition' type="submit">Submit</button>
            </div>
          </form>
        </div>

        {/* Reach out section */}
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-12'>
          <h3 className='text-2xl md:text-3xl text-black'>Or reachout to</h3>
          <div className='text-neutral-900 space-y-1'>
            <p>email@sociallifts.com</p>
            <p>+91 9970271026</p>
            <p>linkedin</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
