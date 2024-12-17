import React from 'react'
import { Link } from 'react-router-dom'

function Card({ children, src, alt, appt }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow bg-slate-50">
        <div className="flex flex-col items-center p-5">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`${src ? src : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s'}`} alt={alt}/>
            {children}
            {appt && 
                <div className="mt-4">
                    <Link to="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#41ab5d] rounded-lg hover:bg-[#238b45] focus:ring-4 focus:outline-none focus:ring-blue-300">Get Appointment</Link>
                </div>
            }
        </div>
    </div>
  )
}

export default Card
