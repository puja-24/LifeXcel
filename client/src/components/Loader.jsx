import React from 'react'

const Loader = () => {
  return (
    <div>
        <div className='flex justify-center items-center h-screen'>
            <div className='animate-spin rounded-full h-18 w-18 border-t-4 border-b-4 border-primary'></div>

        </div>
    </div>
  )
}

export default Loader