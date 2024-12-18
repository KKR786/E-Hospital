import React from 'react'

function Appoinments() {
  return (
    <div>
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <label
                  htmlFor="name"
                  className="absolute top-[-13px] left-3 bg-gray-50"
                >
                  Name
                </label>
                <input
                  className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="relative flex-1">
                <label
                  htmlFor="email"
                  className="absolute top-[-13px] left-3 bg-gray-50"
                >
                  Email
                </label>
                <input
                  className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <label
                  htmlFor="bloodGroup"
                  className="absolute top-[-13px] left-3 bg-gray-50"
                >
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  id="bloodGroup"
                  className="rounded-lg block w-full p-2 bg-gray-50 border-[2.5px] border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
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
                <label
                  htmlFor="userType"
                  className="absolute top-[-13px] left-3 bg-gray-50"
                >
                  User Type
                </label>
                <select
                  name="bloodGroup"
                  id="bloodGroup"
                  className="rounded-lg block w-full p-2 bg-gray-50 border-[2.5px] border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.userType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select User Type</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Therapist">Therapist</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>
            {(formData.userType === "Doctor" ||
              formData.userType === "Therapist") && (
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <label
                    htmlFor="department"
                    className="absolute top-[-13px] left-3 bg-gray-50"
                  >
                    Department
                  </label>
                  <input
                    className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    type="text"
                    name="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  />
                </div>
                <div className="relative flex-1">
                  <label
                    htmlFor="degree"
                    className="absolute top-[-13px] left-3 bg-gray-50"
                  >
                    Degree
                  </label>
                  <input
                    className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    type="text"
                    name="degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <label
                  htmlFor="phoneNumber"
                  className="absolute top-[-13px] left-3 bg-gray-50"
                >
                  Phone Number
                </label>
                <input
                  className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex-1">
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button className="text-white bg-primary-950 hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-[#1e40af]" type="submit">Submit</button>
            </div>
          </form>
    </div>
  )
}

export default Appoinments
