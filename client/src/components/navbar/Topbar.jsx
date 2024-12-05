import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuth";
import { useLogout } from "../../hooks/useLogout";


function Topbar() {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [openMenu, setOpenMenu] = useState(false)

    const handleClick = () => {
        logout();
      };

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-gray-800 border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link href="/" className="flex ms-2 md:me-24">
              {/* img */}
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                E-Hospital
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div className="relative">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
                    alt="user photo"
                  />
                </button>
                {!user.address && <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0 h-3 w-3 text-yellow-600" fill="currentColor" viewBox="0 0 24 24" width="512" height="512"><path d="m22.536,8.46L15.537,1.459C14.592.515,13.337-.006,12.001-.006s-2.592.521-3.536,1.465L1.466,8.46c-1.949,1.949-1.949,5.12,0,7.069l6.999,7.001c.944.944,2.2,1.465,3.536,1.465s2.591-.521,3.536-1.465l6.999-7.001c.944-.944,1.464-2.199,1.464-3.534s-.52-2.591-1.464-3.535Zm-11.536-1.46c0-.553.448-1,1-1s1,.447,1,1v5.5c0,.553-.448,1-1,1s-1-.447-1-1v-5.5Zm1,11c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5.672,1.5,1.5-.672,1.5-1.5,1.5Z"/></svg>}
              </div>

              {openMenu && 
              <div
                className="z-50 origin-top-right top-[48px] absolute right-0 mt-2 w-56 
                rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
                focus:outline-none"
                id="dropdown-user"
              >
                <div className="px-4 py-3 border-b border-solid border-gray-800" role="none">
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
                    {user.name}
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    {user.email}
                  </p>
                </div>

                <ul className="py-1" role="none">
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center gap-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                    >
                      {!user.address ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="m23.121,6.151L17.849.878c-.567-.566-1.321-.878-2.121-.878h-7.455c-.8,0-1.554.312-2.122.879L.879,6.151c-.566.567-.879,1.32-.879,2.121v7.456c0,.801.312,1.554.879,2.121l5.272,5.273c.567.566,1.321.878,2.121.878h7.455c.8,0,1.554-.312,2.122-.879l5.271-5.272c.566-.567.879-1.32.879-2.121v-7.456c0-.801-.313-1.554-.879-2.121Zm-12.121-.151h2v7h-2v-7Zm1,12c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5.672,1.5,1.5-.672,1.5-1.5,1.5Z"/>
                        </svg>
                         :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="currentColor" viewBox="0 0 24 24">
                         <path xmlns="http://www.w3.org/2000/svg" d="M16.043,14H7.957A4.963,4.963,0,0,0,3,18.957V24H21V18.957A4.963,4.963,0,0,0,16.043,14Z"/>
                         <circle xmlns="http://www.w3.org/2000/svg" cx="12" cy="6" r="6"/>
                        </svg>
                      }
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="flex items-center gap-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path xmlns="http://www.w3.org/2000/svg" d="M9,12c-3.309,0-6-2.691-6-6S5.691,0,9,0s6,2.691,6,6-2.691,6-6,6Zm13.696,7.134l-.974-.562c.166-.497,.278-1.019,.278-1.572s-.111-1.075-.278-1.572l.974-.562c.478-.276,.642-.888,.366-1.366-.277-.479-.887-.644-1.366-.366l-.973,.562c-.705-.794-1.644-1.375-2.723-1.594v-1.101c0-.552-.448-1-1-1s-1,.448-1,1v1.101c-1.079,.22-2.018,.801-2.723,1.594l-.973-.562c-.48-.277-1.09-.113-1.366,.366-.276,.479-.112,1.09,.366,1.366l.974,.562c-.166,.497-.278,1.019-.278,1.572s.111,1.075,.278,1.572l-.974,.562c-.478,.276-.642,.888-.366,1.366,.186,.321,.521,.5,.867,.5,.169,0,.341-.043,.499-.134l.973-.562c.705,.794,1.644,1.375,2.723,1.594v1.101c0,.552,.448,1,1,1s1-.448,1-1v-1.101c1.079-.22,2.018-.801,2.723-1.594l.973,.562c.158,.091,.33,.134,.499,.134,.346,0,.682-.179,.867-.5,.276-.479,.112-1.09-.366-1.366Zm-5.696-.634c-.827,0-1.5-.673-1.5-1.5s.673-1.5,1.5-1.5,1.5,.673,1.5,1.5-.673,1.5-1.5,1.5Zm-9-1.5c0-1.044,.187-2.043,.514-2.975C3.778,14.279,0,18.202,0,23c0,.552,.448,1,1,1H11.349c-2.041-1.65-3.349-4.171-3.349-7Z"/>
                      </svg>
                      Settings
                    </Link>
                  </li>
        
                </ul>
                <div className="border-t border-solid border-gray-500">
                    <button
                        className="block w-full px-4 py-2 text-sm text-gray-800 font-semibold hover:bg-gray-700 hover:text-white"
                        role="menuitem"
                        onClick={handleClick}
                        >
                        Sign out
                    </button>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
