import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuth";

function Sidebar() {
  const { user } = useAuthContext();
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r sm:translate-x-0 bg-gray-800 border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 rounded-lg text-white hover:text-gray-900 hover:bg-gray-100 group"
            >
              <svg
                className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to="/find/doctor"
              className="flex items-center p-2 rounded-lg text-white hover:text-gray-900 hover:bg-gray-100 group"
            >
              <svg
                className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path xmlns="http://www.w3.org/2000/svg" d="m19 5h-3v-1a3 3 0 0 0 -3-3h-2a3 3 0 0 0 -3 3v1h-3a5.006 5.006 0 0 0 -5 5v8a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5v-8a5.006 5.006 0 0 0 -5-5zm-9-1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4zm5 11h-2v2a1 1 0 0 1 -2 0v-2h-2a1 1 0 0 1 0-2h2v-2a1 1 0 0 1 2 0v2h2a1 1 0 0 1 0 2z"/>
              </svg>
              <span className="ms-3">Find Doctor</span>
            </Link>
          </li>
          <li>
            <Link
              to="/find/blood"
              className="flex items-center p-2 rounded-lg text-white hover:text-gray-900 hover:bg-gray-100 group"
            >
              <svg
                className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path xmlns="http://www.w3.org/2000/svg" d="m20.499,9h-.002c-.936,0-1.837-.366-2.473-1.002-.66-.658-1.024-1.537-1.024-2.474s.361-1.812,1.019-2.468l2.481-2.428,2.467,2.414c.669.669,1.033,1.548,1.033,2.482s-.364,1.814-1.025,2.475c-.637.636-1.539,1.001-2.476,1.001ZM3.564,5.257l2.163,2.023-.844.844c-1.17,1.17-1.17,3.073,0,4.243l8.707,8.707h6s2.957,2.957,2.957,2.957l1.414-1.414-2.957-2.957v-6s-1.302-1.302-1.302-1.302l-3.207,3.207-1.414-1.414,3.207-3.207-1.586-1.586-3.207,3.207-1.414-1.414,3.207-3.207-1.586-1.586-3.207,3.207-1.414-1.414,3.206-3.206c-1.171-1.162-3.066-1.159-4.233.008l-.913.913-2.178-2.038,2.255-2.305L5.789.124.039,5.999l1.43,1.398,2.095-2.141Z"/>
              </svg>
              <span className="ms-3">Get Blood</span>
            </Link>
          </li>
          <li>
            <Link
              to="/find/therapist"
              className="flex items-center p-2 rounded-lg text-white hover:text-gray-900 hover:bg-gray-100 group"
            >
              <svg
                className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path xmlns="http://www.w3.org/2000/svg" d="M11,11c0,.5-.647,1-1,1-1.657,0-3-1.343-3-3,0-.277,.05-.541,.12-.796-.676-.501-1.12-1.298-1.12-2.204,0-1.114,.665-2.067,1.617-2.5-.068-.24-.117-.488-.117-.75,0-1.519,1.231-2.75,2.75-2.75,.263,0,.75,0,.75,1V11Zm7-5c0-1.114-.665-2.067-1.617-2.5,.068-.24,.117-.488,.117-.75,0-1.519-1.231-2.75-2.75-2.75-.263,0-.75,0-.75,1V11c0,1,.647,1,1,1,1.657,0,3-1.343,3-3,0-.277-.05-.541-.12-.796,.676-.501,1.12-1.298,1.12-2.204ZM5.565,16.687l2.487,2.532c.122-1.225,.669-2.378,1.587-3.212l.874-.794-1.813-1.646c-1.017-.923-2.668-.721-3.407,.533-.48,.815-.331,1.858,.272,2.586ZM1.5,6c.828,0,1.5,.672,1.5,1.5v7.5s.011,0,.011,0c-.05,1.022,.267,2.061,.956,2.893l4.033,4.107v1c0,.552-.448,1-1,1H3.691c-.281,0-.549-.118-.738-.326l-.598-.654C.84,21.362,0,19.197,0,16.95V7.5c0-.828,.672-1.5,1.5-1.5Zm9.483,11.487l4.317-3.92c1.017-.923,2.668-.721,3.407,.533,.48,.815,.331,1.858-.272,2.586l-2.548,2.573c-.384,.388-.383,1.014,.003,1.4h0c.389,.389,1.02,.387,1.407-.004l2.735-2.763c.689-.832,1.005-1.871,.956-2.893h.011V7.5c0-.828,.672-1.5,1.5-1.5s1.5,.672,1.5,1.5v9.45c0,2.246-.84,4.412-2.355,6.07l-.598,.654c-.189,.207-.457,.326-.738,.326H11c-.552,0-1-.448-1-1v-3.292c0-.846,.357-1.652,.983-2.221Z"/>
              </svg>
              <span className="ms-3">Find Therapist</span>
            </Link>
          </li>

          {(user.role === 'Supreme' || user.role === 'Admin') && <>
            <li className="text-[#ced4da] mt-6 p-[1.5rem_0.5rem_0.375rem]">Super Admin Tools</li>

            <li>
            <Link
              to="/user-management"
              className="flex items-center p-2 rounded-lg text-white hover:text-gray-900 hover:bg-gray-100 group"
            >
              <svg
                className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/role-management"
              className="flex items-center p-2 rounded-lg text-white hover:text-gray-900 hover:bg-gray-100 group"
            >
              <svg
                className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21,11h-5c-1.654,0-3,1.346-3,3v7c0,1.654,1.346,3,3,3h5c1.654,0,3-1.346,3-3v-7c0-1.654-1.346-3-3-3Zm-1,9h-3c-.553,0-1-.448-1-1s.447-1,1-1h3c.553,0,1,.448,1,1s-.447,1-1,1Zm0-4.003h-3c-.553,0-1-.448-1-1s.447-1,1-1h3c.553,0,1,.448,1,1s-.447,1-1,1ZM3,6C3,2.691,5.691,0,9,0s6,2.691,6,6-2.691,6-6,6S3,9.309,3,6ZM12.026,24H1c-.557,0-1.001-.46-1-1.017,.009-4.955,4.043-8.983,9-8.983h0c.688,0,1.356,.085,2,.232v6.768c0,1.13,.391,2.162,1.026,3Z" />
              </svg>
              <span className="ms-3">Role Management</span>
            </Link>
          </li>
          </>
          }
          {!user && (
            <li>
              <Link
                to="/login"
                className="flex items-center p-2 rounded-lg text-white hover:text-gray-900 hover:bg-gray-100 group"
              >
                <svg
                  className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </Link>
            </li>
          )}
          {/* <li>
            <Link
              to="/signup"
              className="flex items-center p-2 rounded-lg text-white hover:text-gray-900 hover:bg-gray-100 group"
            >
              <svg
                className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
            </Link>
          </li> */}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
