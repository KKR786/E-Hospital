import React, { useState } from 'react'
import { useAuthContext } from "../hooks/useAuth";
import { searchPlace } from '../helper';

function Profile() {
    const { user } = useAuthContext();
    const [userData, setUserData] = useState([]);
    const [place, setPlace] = useState('');

    React.useEffect(() => {
        const userInfo = async () => {
          const res = await fetch(`/api/protected/user/profile/${user.id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          const json = await res.json();
          
          if (res.ok) {
            setUserData(json.user);
          }
        };
      
        if (user) {
            userInfo();
        }
      }, [user]);

      const onChangePlace = async(e) => {
        setPlace(e.target.value);
        const coordinates = await searchPlace(place);
        const {lat, lon} = coordinates[0]
        console.log(lat, lon);
      }
  return (
    <div className="px-4 py-10 bg-gray-50">
      <div className="flex items-center">
        <h1 className='text-lg font-bold'>{user.name.toUpperCase()}</h1>
        <span className="border-b-2 border-black flex-grow ml-2"></span>
      </div>
        {userData && 
        <div className="flex flex-col gap-y-5 mt-5">
            <div className="flex space-x-4">
                <div className="relative flex-1">
                    <label htmlFor="name" className="absolute top-[-13px] left-3 bg-gray-50">Name</label>
                    <input className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" type="text" name="name" value={userData.name} />
                </div>
                <div className="relative flex-1">
                    <label htmlFor="email" className="absolute top-[-13px] left-3 bg-gray-50">Email</label>
                    <input className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" type="email" name="email" value={userData.email} />
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="relative flex-1">
                    <label htmlFor="bloodGroup" className="absolute top-[-13px] left-3 bg-gray-50">Blood Group</label>
                    <select
                    name="bloodGroup"
                    id="bloodGroup"
                    className="rounded-lg block w-full p-2 bg-gray-50 border-[2.5px] border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    value={userData.bloodGroup}
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div className="relative flex-1">
                    <label htmlFor="userType" className="absolute top-[-13px] left-3 bg-gray-50">User Type</label>
                    <select
                    name="bloodGroup"
                    id="bloodGroup"
                    className="rounded-lg block w-full p-2 bg-gray-50 border-[2.5px] border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    value={userData.userType}
                    required
                  >
                    <option value="">Select User Type</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Therapist">Therapist</option>
                    <option value="User">User</option>
                  </select>
                </div>
            </div>
            {(userData.userType === 'Doctor' || userData.userType === 'Therapist') &&
                <div className="flex space-x-4">
                <div className="relative flex-1">
                    <label htmlFor="department" className="absolute top-[-13px] left-3 bg-gray-50">Department</label>
                    <input className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" type="text" name="department" value={userData.department} />
                </div>
                <div className="relative flex-1">
                    <label htmlFor="degree" className="absolute top-[-13px] left-3 bg-gray-50">Degree</label>
                    <input className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" type="text" name="degree" value={userData.degree} />
                </div>
            </div>
            }
            <div className="flex space-x-4">
                <div className="relative flex-1">
                    <label htmlFor="phoneNumber" className="absolute top-[-13px] left-3 bg-gray-50">Phone Number</label>
                    <input className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" type="text" name="phoneNumber" value={userData.phoneNumber} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 my-[14px]">
                    <input
                      type="checkbox"
                      name="willDonateBlood"
                      id="willDonateBlood"
                      checked={userData.willDonateBlood}
                      className="w-5 h-5"
                    />
                    <label
                      htmlFor="willDonateBlood"
                      className="text-sm font-medium"
                    >
                      I Will Donate Blood
                    </label>
                  </div>
                </div>
            </div>
            <div className="relative">
                <label htmlFor="address" className="absolute top-[-13px] left-3 bg-gray-50">Address</label>
                <input className={`block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 ${!userData?.address ? 'focus:ring-yellow-600 focus:border-yellow-600' : 'focus:ring-blue-500 focus:border-blue-500'} focus:outline-none`} autoFocus={!userData?.address} type="text" name="address" value={userData?.address?.place} onChange={onChangePlace}/>
            </div>
        </div>}
    </div>
  )
}

export default Profile
