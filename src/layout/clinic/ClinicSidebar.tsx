import { Link } from 'react-router-dom';
import React from 'react';

const ClinicSidebar: React.FC = () => {
  return (
    <div className="flex">
      <aside className=" bg-white h-screen w-full p-4 shadow-lg">
        <div className="flex bg-amber-50 items-center flex-wrap">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="/img/Remove-bg.ai_1728293836056.png"
              className="w-1/2 h-1/2"
              alt=""
            />
          </div>
          <span className="w-full h-auto ml-2 text-xl text-gray-600 font-bold">
            Koi Pond Construction
          </span>
        </div>
        <nav>
          <ul className="bg-gray-100 rounded-md p-2 my-2 opacity-90 items-center justify-center">
            <li className="my-4 text-xl">
              <Link
                to="/Admin/Dashboard"
                className="flex items-center rounded-full p-2 text-gray-700 hover:bg-blue-300 hover:text-white"
              >
                Tổng quan
              </Link>
            </li>
            <li className="my-4 text-xl">
              <Link
                to="/Admin/User"
                className="flex items-center rounded-full p-2 text-gray-700 hover:bg-blue-300 hover:text-white"
              >
                Người dùng
              </Link>
            </li>
            <li className="my-4 text-xl">
              <Link
                to="/Admin/Orders"
                className="flex items-center rounded-full p-2 text-gray-700 hover:bg-blue-300 hover:text-white"
              >
                Đơn hàng
              </Link>
            </li>
            <li className="my-4 text-xl">
              <Link
                to="/Admin/RatingManage"
                className="flex items-center rounded-full p-2 text-gray-700 hover:bg-blue-300 hover:text-white"
              >
                Đánh giá
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default ClinicSidebar;
