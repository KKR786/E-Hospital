import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import Error from "../components/toast/Error";

function Register() {
  const { signup, error, isLoading } = useSignup();
  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    bloodGroup: "",
    address: "",
    phoneNumber: "",
    userType: "",
    department: "",
    degree: "",
    willDonateBlood: "",
    role: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append("dp", photo);

    await signup(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(formData.userType)
  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-1/2 rounded-lg shadow border md:mt-0 max-sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="lg:flex lg:space-x-4">
                <div className="flex-1">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                    className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleInputChange}
                    className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Khalid"
                    required
                  />
                </div>
              </div>

              <div className="lg:flex lg:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="bloodGroup"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    id="bloodGroup"
                    onChange={handleInputChange}
                    className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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

                <div className="flex-1">
                  <label
                    htmlFor="userType"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    User Type
                  </label>
                  <select
                    name="userType"
                    id="userType"
                    onChange={handleInputChange}
                    className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select User Type</option>
                    <option value="doctor">Doctor</option>
                    <option value="therapist">Therapist</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>

              {(formData.userType === 'doctor' || formData.userType === 'therapist') && <div className="lg:flex lg:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="department"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    id="department"
                    onChange={handleInputChange}
                    className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Cardiology"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="degree"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Degree
                  </label>
                  <input
                    type="text"
                    name="degree"
                    id="degree"
                    onChange={handleInputChange}
                    className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. MD, MBBS"
                  />
                </div>
              </div>}

              <div className="lg:flex lg:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    onChange={handleInputChange}
                    className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your phone number"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-white">
                    Donate Blood
                  </label>
                  <div className="flex items-center space-x-2 my-[14px]">
                    <input
                      type="checkbox"
                      name="willDonateBlood"
                      id="willDonateBlood"
                      onChange={handleInputChange}
                      className="w-5 h-5"
                    />
                    <label
                      htmlFor="willDonateBlood"
                      className="text-sm font-medium text-white"
                    >
                      I Will Donate Blood
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={handleInputChange}
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your address"
                  required
                />
              </div>

              {/* Role Input */}
              {/* <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  onChange={handleInputChange}
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Admin, User, etc."
                  required
                />
              </div> */}

              <div className="lg:flex lg:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="dp"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="dp"
                    id="dp"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="border rounded-lg block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex-1">
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={handleInputChange}
                    className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white bg-primary-950 hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-[#1e40af]"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium hover:underline text-[#3b82f6]"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {error && <Error message={error} />}
    </section>
  );
}

export default Register;
