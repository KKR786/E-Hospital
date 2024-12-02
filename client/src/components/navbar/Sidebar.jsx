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
          <li>
            <Link
              to="/task-management"
              className="flex items-center p-2 rounded-lg text-white hover:text-gray-900 hover:bg-gray-100 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path xmlns="http://www.w3.org/2000/svg" d="M0,18c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V10H0v8Zm14-5h4c.553,0,1,.448,1,1s-.447,1-1,1h-4c-.553,0-1-.447-1-1s.447-1,1-1Zm0,5h4c.553,0,1,.447,1,1s-.447,1-1,1h-4c-.553,0-1-.447-1-1s.447-1,1-1ZM5.027,12.995c.38-.402,1.013-.418,1.413-.039l1.015,.96,1.838-1.838c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-1.982,1.982c-.352,.352-.809,.528-1.266,.528-.441,0-.883-.164-1.23-.493l-1.163-1.103c-.401-.379-.418-1.012-.038-1.413Zm0,5c.38-.401,1.013-.418,1.413-.038l1.015,.96,1.838-1.838c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-1.982,1.982c-.352,.352-.809,.528-1.266,.528-.441,0-.883-.164-1.23-.493l-1.163-1.103c-.401-.379-.418-1.013-.038-1.413ZM19,1H5C2.243,1,0,3.243,0,6v2H24v-2c0-2.757-2.243-5-5-5ZM4.5,6c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5,.672,1.5,1.5-.672,1.5-1.5,1.5Zm4,0c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5,.672,1.5,1.5-.672,1.5-1.5,1.5Z"/>
              </svg>
              <span className="ms-3">Task Management</span>
            </Link>
          </li>
          <li>
            <Link
              to="/site-config"
              className="flex items-center p-2 rounded-lg text-white hover:text-gray-900 hover:bg-gray-100 group"
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" fill="currentColor">
                <path d="m7.3,9.862l1.411-.813c.605.652,1.393,1.125,2.289,1.33v1.621h2v-1.621c.896-.205,1.685-.678,2.289-1.33l1.411.813.998-1.733-1.416-.816c.129-.418.218-.853.218-1.313s-.089-.895-.218-1.313l1.416-.816-.998-1.733-1.411.813c-.605-.652-1.393-1.125-2.289-1.33V0h-2v1.621c-.896.205-1.685.678-2.289,1.33l-1.411-.813-.998,1.733,1.416.816c-.129.418-.218.853-.218,1.313s.089.895.218,1.313l-1.416.816.998,1.733Zm4.7-5.362c.827,0,1.5.673,1.5,1.5s-.673,1.5-1.5,1.5-1.5-.673-1.5-1.5.673-1.5,1.5-1.5Zm1,16.5v1h4v2H7v-2h4v-1H0v-13c0-1.654,1.346-3,3-3h1.069c-.041.328-.069.661-.069,1,0,4.418,3.582,8,8,8s8-3.582,8-8c0-.339-.028-.672-.069-1h1.069c1.654,0,3,1.346,3,3v13h-11Z"/>
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Site Configuration</span>
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="flex items-center p-2 rounded-lg text-white hover:text-gray-900 hover:bg-gray-100 group"
            >
              <svg
                className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
            </Link>
          </li>
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
