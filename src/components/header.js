import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGO_URL } from "../utils/constants";
import { IoFastFoodOutline } from "react-icons/io5";

const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");

  const totalItems = useSelector((store) =>
    Object.values(store.cart.items).reduce(
      (sum, item) => sum + item.quantity,
      0
    )
  );

  return (
    <div className="fixed top-0 left-0 w-full z-20 border-b-orange-100 bg-white shadow-md">
      <div className="flex justify-between items-center h-20 px-8">
        <div className="logo-container flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <div className="text-6xl text-orange-500">
              <IoFastFoodOutline />
            </div>
            <span className="text-2xl font-bold text-orange-500 ml-2">
              Just4Food
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li className="font-bold text-md hover:text-orange-500">
              <Link to="/">Home</Link>
            </li>
            <li className="font-bold text-md  hover:text-orange-500">
              <Link to="/about">About</Link>
            </li>
            <li className="font-bold text-md  hover:text-orange-500">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="font-bold text-md  hover:text-orange-500">
              <Link to="/grocery">Grocery</Link>
            </li>
            <li className="font-bold text-md  hover:text-orange-500">
              <Link to="/cart">Cart - {totalItems}</Link>
            </li>
          </ul>

          <button
            className="px-4 py-2 bg-orange-500 hover:bg-orange-700 cursor-pointer text-white font-semibold rounded-lg"
            onClick={() =>
              setLoginBtn(loginBtn === "Login" ? "Logout" : "Login")
            }
          >
            {loginBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
