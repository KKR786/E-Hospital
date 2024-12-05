import React from 'react'
import { useAuthContext } from "../hooks/useAuth";

function Profile() {
    const { user } = useAuthContext();
  return (
    <div className="px-4 py-10">
      <div className="flex items-center">
        <h1 className='text-lg font-bold'>{user.name.toUpperCase()}</h1>
        <span className="border-b-2 border-black flex-grow ml-2"></span>
      </div>

    </div>
  )
}

export default Profile
