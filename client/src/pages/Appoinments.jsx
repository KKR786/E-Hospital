import React, { useState } from 'react'

function Appoinments() {
  const [formData, setFormData] = useState ({
    appointmentDate: '',
    reasonForVisit: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = () => {}

  return (
    <div className="p-5 justify-center flex flex-col w-full items-center">
      <h1 className="mb-5 font-semibold text-[24px]">Appointment for {}</h1>
      <form className="flex flex-col gap-y-5 w-2/4" onSubmit={handleSubmit}>
      <div className="relative flex-1">
                <label
                  htmlFor="appointmentDate"
                  className="absolute top-[-13px] left-3 bg-gray-50"
                >
                  Date
                </label>
                <input
                  className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate || new Date().toISOString().split("T")[0]}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="relative flex-1">
                <label
                  htmlFor="reasonForVisit"
                  className="absolute top-[-13px] left-3 bg-gray-50"
                >
                  Reason For Visit
                </label>
                <textarea
                  className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  type="text"
                  name="reasonForVisit"
                  value={formData.reasonForVisit}
                  onChange={handleInputChange}
                  required
                  rows="6"
                />
              </div>
            
            <div className="flex items-center justify-center">
              <button className="text-white bg-primary-950 hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-[#1e40af]" type="submit">Submit</button>
            </div>
          </form>
    </div>
  )
}

export default Appoinments
