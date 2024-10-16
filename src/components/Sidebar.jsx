import React, { useState } from 'react';
import { Logo } from '../assets';
import { useDispatch } from 'react-redux';
import { setActiveContent } from '../store/content';
import { logout } from '../store/auth';

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNavigation = (content) => {
    dispatch(setActiveContent(content));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <aside className="w-64 bg-blue-400 h-full flex flex-col justify-between pb-10">
        <div className="px-3 py-4 overflow-y-auto">
            <div className='flex justify-center'>
                <img src={Logo} alt="" className='w-40' />
            </div>
                <ul className="space-y-2">
                    <li>
                    <button
                        onClick={() => handleNavigation('dashboard')}
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                    >
                        <svg
                        className="w-6 h-6 text-white transition duration-75 group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                        </svg>
                        <span className="ml-3">Dashboard</span>
                    </button>
                    </li>
                    <li>
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" fill='currentColor' viewBox="0 0 48 48">
                            <path d="M 24 4 C 22.423103 4 20.902664 4.1994284 19.451172 4.5371094 A 1.50015 1.50015 0 0 0 18.300781 5.8359375 L 17.982422 8.7382812 C 17.878304 9.6893592 17.328913 10.530853 16.5 11.009766 C 15.672739 11.487724 14.66862 11.540667 13.792969 11.15625 L 13.791016 11.15625 L 11.125 9.9824219 A 1.50015 1.50015 0 0 0 9.4257812 10.330078 C 7.3532865 12.539588 5.7626807 15.215064 4.859375 18.201172 A 1.50015 1.50015 0 0 0 5.4082031 19.845703 L 7.7734375 21.580078 C 8.5457929 22.147918 9 23.042801 9 24 C 9 24.95771 8.5458041 25.853342 7.7734375 26.419922 L 5.4082031 28.152344 A 1.50015 1.50015 0 0 0 4.859375 29.796875 C 5.7625845 32.782665 7.3519262 35.460112 9.4257812 37.669922 A 1.50015 1.50015 0 0 0 11.125 38.015625 L 13.791016 36.841797 C 14.667094 36.456509 15.672169 36.511947 16.5 36.990234 C 17.328913 37.469147 17.878304 38.310641 17.982422 39.261719 L 18.300781 42.164062 A 1.50015 1.50015 0 0 0 19.449219 43.460938 C 20.901371 43.799844 22.423103 44 24 44 C 25.576897 44 27.097336 43.800572 28.548828 43.462891 A 1.50015 1.50015 0 0 0 29.699219 42.164062 L 30.017578 39.261719 C 30.121696 38.310641 30.671087 37.469147 31.5 36.990234 C 32.327261 36.512276 33.33138 36.45738 34.207031 36.841797 L 36.875 38.015625 A 1.50015 1.50015 0 0 0 38.574219 37.669922 C 40.646713 35.460412 42.237319 32.782983 43.140625 29.796875 A 1.50015 1.50015 0 0 0 42.591797 28.152344 L 40.226562 26.419922 C 39.454197 25.853342 39 24.95771 39 24 C 39 23.04229 39.454197 22.146658 40.226562 21.580078 L 42.591797 19.847656 A 1.50015 1.50015 0 0 0 43.140625 18.203125 C 42.237319 15.217017 40.646713 12.539588 38.574219 10.330078 A 1.50015 1.50015 0 0 0 36.875 9.984375 L 34.207031 11.158203 C 33.33138 11.54262 32.327261 11.487724 31.5 11.009766 C 30.671087 10.530853 30.121696 9.6893592 30.017578 8.7382812 L 29.699219 5.8359375 A 1.50015 1.50015 0 0 0 28.550781 4.5390625 C 27.098629 4.2001555 25.576897 4 24 4 z M 24 7 C 24.974302 7 25.90992 7.1748796 26.847656 7.3398438 L 27.035156 9.0644531 C 27.243038 10.963375 28.346913 12.652335 30 13.607422 C 31.654169 14.563134 33.668094 14.673009 35.416016 13.904297 L 37.001953 13.207031 C 38.219788 14.669402 39.183985 16.321182 39.857422 18.130859 L 38.451172 19.162109 C 36.911538 20.291529 36 22.08971 36 24 C 36 25.91029 36.911538 27.708471 38.451172 28.837891 L 39.857422 29.869141 C 39.183985 31.678818 38.219788 33.330598 37.001953 34.792969 L 35.416016 34.095703 C 33.668094 33.326991 31.654169 33.436866 30 34.392578 C 28.346913 35.347665 27.243038 37.036625 27.035156 38.935547 L 26.847656 40.660156 C 25.910002 40.82466 24.973817 41 24 41 C 23.025698 41 22.09008 40.82512 21.152344 40.660156 L 20.964844 38.935547 C 20.756962 37.036625 19.653087 35.347665 18 34.392578 C 16.345831 33.436866 14.331906 33.326991 12.583984 34.095703 L 10.998047 34.792969 C 9.7799772 33.330806 8.8159425 31.678964 8.1425781 29.869141 L 9.5488281 28.837891 C 11.088462 27.708471 12 25.91029 12 24 C 12 22.08971 11.087719 20.290363 9.5488281 19.160156 L 8.1425781 18.128906 C 8.8163325 16.318532 9.7814501 14.667839 11 13.205078 L 12.583984 13.902344 C 14.331906 14.671056 16.345831 14.563134 18 13.607422 C 19.653087 12.652335 20.756962 10.963375 20.964844 9.0644531 L 21.152344 7.3398438 C 22.089998 7.1753403 23.026183 7 24 7 z M 24 16 C 19.599487 16 16 19.59949 16 24 C 16 28.40051 19.599487 32 24 32 C 28.400513 32 32 28.40051 32 24 C 32 19.59949 28.400513 16 24 16 z M 24 19 C 26.779194 19 29 21.220808 29 24 C 29 26.779192 26.779194 29 24 29 C 21.220806 29 19 26.779192 19 24 C 19 21.220808 21.220806 19 24 19 z"></path>
                            </svg>
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Laporan Lalin</span>
                        <svg
                        className={`w-6 h-6 transition-transform duration-300 ${
                            isDropdownOpen ? 'rotate-180' : ''
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <ul className="py-2 space-y-2">
                        <li>
                            <button
                            onClick={() => handleNavigation('lalin')}
                            className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11"
                            >
                            Laporan per Hari
                            </button>
                        </li>
                        </ul>
                    )}
                    </li>
                    <li>
                    <button
                        onClick={() => handleNavigation('masterdata')}
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                    >
                        <svg fill="#FFFFFF" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                            viewBox="0 0 60 60" xmlSpace="preserve">
                        <g>
                            <path d="M59,54.878h-1v-14H46v14h-3v-23H31v23h-3v-31H16v31h-3v-39H1v39c-0.552,0-1,0.447-1,1s0.448,1,1,1h12h3h12h3h12h3h12h1
                                c0.552,0,1-0.447,1-1S59.552,54.878,59,54.878z M3,54.878v-37h8v37H3z M18,54.878v-29h8v29H18z M33,54.878v-21h8v21H33z M48,54.878
                                v-12h8v12H48z"/>
                            <path d="M11.781,4.989l36.269,20.94l-5.457,0.529c-0.549,0.053-0.952,0.542-0.898,1.092c0.05,0.517,0.485,0.903,0.994,0.903
                                c0.032,0,0.064-0.002,0.098-0.005l8.563-0.83c0.016-0.001,0.029-0.011,0.044-0.014c0.079-0.011,0.155-0.032,0.23-0.062
                                c0.014-0.006,0.029-0.003,0.043-0.009c0.01-0.005,0.016-0.014,0.026-0.019c0.003-0.001,0.006-0.002,0.009-0.004
                                c0.011-0.006,0.024-0.008,0.035-0.014c0.087-0.048,0.166-0.111,0.236-0.185c0.011-0.012,0.021-0.024,0.032-0.037
                                c0.018-0.02,0.03-0.042,0.046-0.064c0.022-0.03,0.05-0.056,0.069-0.089c0.014-0.024,0.014-0.051,0.026-0.076
                                c0.016-0.034,0.037-0.065,0.049-0.101c0.013-0.037,0.014-0.075,0.023-0.114c0.012-0.055,0.021-0.107,0.024-0.162
                                c0.002-0.038,0.007-0.073,0.004-0.111c-0.001-0.012,0.005-0.022,0.003-0.034c-0.003-0.028-0.018-0.05-0.023-0.077
                                c-0.01-0.056-0.024-0.109-0.044-0.162c-0.009-0.026-0.007-0.052-0.018-0.078l-3.563-7.83c-0.229-0.503-0.822-0.728-1.324-0.496
                                c-0.503,0.229-0.725,0.821-0.496,1.324l2.27,4.99L12.781,3.256c-0.48-0.276-1.09-0.111-1.366,0.366
                                C11.139,4.101,11.303,4.713,11.781,4.989z"/>
                        </g>
                        </svg>
                        <span className="ml-3">Master Gerbang</span>
                    </button>
                    </li>
                </ul>
        </div>
                <button className='flex justify-center bg-blue-900 px-1 py-2 rounded-sm text-white' onClick={handleLogout}>Logout</button>
      </aside>
    </>
  );
};

export default Sidebar;
