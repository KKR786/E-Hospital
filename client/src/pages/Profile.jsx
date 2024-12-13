import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuth";
import { searchPlace } from "../helper";
import Success from "../components/toast/Success";
import Error from "../components/toast/Error";

function Profile() {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userData, setUserData] = useState({});

  const [department, setDepartment] = useState('');
  const [degree, setDegree] = useState('');
  const [blood, setBlood] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zip: "",
    country: "",
  });
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    bloodGroup: '',
    phoneNumber: '',
    userType: '',
  });

  const extractAddress = (place) => {
    const parts = place.split(',');

    if (parts.length >= 3) {
      const street = parts[0].trim();
      const cityZip = parts[1].trim();
      const country = parts[2].trim();

      const cityParts = cityZip.split('-');
      const city = cityParts[0].trim();
      const zip = cityParts[1] ? cityParts[1].trim() : '';

      setAddress({
        street,
        city,
        zip,
        country,
      });
    }
  }

  React.useEffect(() => {
    const userInfo = async () => {
      const res = await fetch(`/api/protected/user/profile/${user.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
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

  React.useEffect(() => {
    if (userData.email) {
      setFormData({
        email: userData.email || '',
        name: userData.name || '',
        bloodGroup: userData.bloodGroup || '',
        phoneNumber: userData.phoneNumber || '',
        userType: userData.userType || '',
      });

      setDepartment(userData.department || '');
      setDegree(userData.degree || '');
      setBlood(userData.willDonateBlood || false);

      if (userData.address) {
        extractAddress(userData.address.place);
      }
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const place = address.street +
    ", " +
    address.city +
    "-" +
    address.zip +
    ", " +
    address.country;
    const coordinates = await searchPlace(place);
    
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append("willDonateBlood", blood);
    data.append('address[place]', place);
    data.append('address[coordinates][]', coordinates[0].lon);
    data.append('address[coordinates][]', coordinates[0].lat);

    if(formData.userType !== 'User') {
      data.append("department", department);
      data.append("degree", degree);
    }

    const res = await fetch(`/api/protected/user/profile/${user.id}`, {
      method: 'PATCH',
      body: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      setSuccess('')
    }
    if (res.ok) {
      setSuccess('Profile Updated Successfully')
      setError(null);
    }
  }
  
  return (
    <div className="px-4 py-10 bg-gray-50">
      <div className="flex items-center">
        <h1 className="text-lg font-bold">{user.name.toUpperCase()}</h1>
        <span className="border-b-2 border-black flex-grow ml-2"></span>
      </div>
      {userData && (
        <div className="p-5 mt-5 border-2 border-dashed rounded-lg border-gray-700">
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
                <div className="flex items-center space-x-2 my-[14px]">
                  <input
                    type="checkbox"
                    name="willDonateBlood"
                    id="willDonateBlood"
                    checked={blood}
                    onChange={(e) => setBlood(e.target.checked)}
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
              <label
                htmlFor="address"
                className="absolute top-[-13px] left-3 bg-gray-50"
              >
                Address
              </label>
              <div
                className={`flex items-center justify-between pt-6 pb-4 px-3 gap-x-2 w-full text-sm text-gray-900 border-[2.5px] rounded-lg bg-gray-50 ${
                  !userData?.address ? "border-yellow-600" : "border-gray-300"
                } focus:outline-none`}
              >
                <div className="relative w-[40%]">
                  <label
                    htmlFor="street"
                    className="absolute top-[-13px] left-3 bg-gray-50"
                  >
                    Street Address
                  </label>
                  <input
                    className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    required
                  />
                </div>

                <div className="relative w-[20%]">
                  <label
                    htmlFor="city"
                    className="absolute top-[-13px] left-3 bg-gray-50"
                  >
                    City
                  </label>
                  <input
                    className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    required
                  />
                </div>

                <div className="relative w-[20%]">
                  <label
                    htmlFor="zip"
                    className="absolute top-[-13px] left-3 bg-gray-50"
                  >
                    Zip Code
                  </label>
                  <input
                    className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    type="text"
                    name="zip"
                    value={address.zip}
                    onChange={handleAddressChange}
                    required
                  />
                </div>

                <div className="relative w-[25%]">
                  <label
                    htmlFor="country"
                    className="absolute top-[-13px] left-3 bg-gray-50"
                  >
                    Country
                  </label>
                  <input
                    className="block w-full p-2 ps-3 text-sm text-gray-900 border-[2.5px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    type="text"
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button className="text-white bg-primary-950 hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-[#1e40af]" type="submit">Update</button>
            </div>
          </form>
        </div>
      )}
      {success && <Success message={success} />}
      {error && <Error message={String(error)} />}
    </div>
  );
}

export default Profile;
