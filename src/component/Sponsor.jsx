import React from 'react'

const Sponsor = () => {
  return (
    <div>
      <div className=' bg-gray-900 my-5 lg:py-0 md:py-0 py-5'>
        <h2 className='text-2xl font-bold text-orange-500 text-center mb-2'>
          Trusted by Top Global Brands
        </h2>
        <p className='text-gray-300 text-center mb-6 max-w-xl mx-auto'>
          We’re proud to collaborate with world-class companies that shape the future of online shopping.
        </p>
        <div className='flex flex-wrap justify-center gap-8'>
          <div className='w-24 h-16 mb-5 flex items-center justify-center border border-orange-500 rounded-lg shadow-lg p-2 bg-white hover:scale-110 transition-transform duration-300'>
            <span className='text-xl font-semibold text-gray-800'>eBay</span>
          </div>
          <div className='w-24 h-16 flex items-center justify-center border border-orange-500 rounded-lg shadow-lg p-2 bg-white hover:scale-110 transition-transform duration-300'>
            <span className='text-xl font-semibold text-gray-800'>Amazon</span>
          </div>
          <div className='w-24 h-16 flex items-center justify-center border border-orange-500 rounded-lg shadow-lg p-2 bg-white hover:scale-110 transition-transform duration-300'>
            <span className='text-xl font-semibold text-gray-800'>Nike</span>
          </div>
          <div className='w-24 h-16 flex items-center justify-center border border-orange-500 rounded-lg shadow-lg p-2 bg-white hover:scale-110 transition-transform duration-300'>
            <span className='text-xl font-semibold text-gray-800'>Gucci</span>
          </div>
          <div className='w-24 h-16 flex items-center justify-center border border-orange-500 rounded-lg shadow-lg p-2 bg-white hover:scale-110 transition-transform duration-300'>
            <span className='text-xl font-semibold text-gray-800'>Versace</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sponsor
