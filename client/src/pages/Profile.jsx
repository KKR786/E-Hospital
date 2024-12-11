import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuth";
import { searchPlace } from "../helper";
import Success from "../components/toast/Success";
import Error from "../components/toast/Error";

function Profile() {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userData, setUserData] = useState([]);

  const [department, setDepartment] = useState('')
  const [degree, setDegree] = useState('')
  const [blood, setBlood] = useState(false);
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zip: "",
    country: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    bloodGroup: "",
    phoneNumber: "",
    userType: "",
    password: "",
  });

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

  const onChangePlace = async (e) => {
    setPlace(e.target.value);
    const coordinates = await searchPlace(place);
    const { lat, lon } = coordinates[0];
    console.log(lat, lon);
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

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append("willDonateBlood", blood);

    if(formData.userType !== 'User') {
      data.append("department", department);
      data.append("degree", degree);
    }

  }
  
  console.log(
    address.street +
      ", " +
      address.city +
      "-" +
      address.zip +
      ", " +
      address.country
  );
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
                  value={userData.name}
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
                  value={userData.email}
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
            {(userData.userType === "Doctor" ||
              userData.userType === "Therapist") && (
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
                    value={userData.department}
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
                    value={userData.degree}
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
                  value={userData.phoneNumber}
                />
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
