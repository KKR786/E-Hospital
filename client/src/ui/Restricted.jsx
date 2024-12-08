import React from 'react'
import stop from '../assets/stop.png'

function Restricted() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-56px)]">
        <div className="text-center flex flex-col items-center">
          <img src={stop} alt="" className="w-36 h-36" />
      <h1 className="text-4xl font-bold">403 - Forbidden</h1>
      <p className="text-lg mt-2">Oops! You don't have permission to view this page.</p>
    </div>
    </div>
  )
}

export default Restricted
