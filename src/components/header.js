import { LOGO_URL } from "../utils/constants";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import useOnline from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
// import userContext from "../utils/userContext";

const Header = () => {
  const [LoginBtn, setLoginBtn] = useState("login");

  const cartItems = useSelector((store) => store.cart.items);

  // const istoOnline = useOnline();

  // const {loggedInUser} = useContext(userContext);
  // if (!istoOnline) {
  //   return <h1>No Internet !</h1>;
  // }
  return (
    <div className="flex justify-between bg-fuchsia-50">
      <div className="logo-container">
        <img className="w-26" src={LOGO_URL}></img>
      </div>
      <div className="flex items-center ">
        <ul className="flex m-4 p-4">
          {/* <li className="px-4">Online : {istoOnline ? "✅" : "❌"}</li> */}
          <li className="px-4 font-bold text-md">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4 font-bold text-md">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4 font-bold text-md">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4 font-bold text-md">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4 font-bold text-lg">
            <Link to="/cart">Cart - {cartItems.length} </Link>
          </li>
          <button
            className="px-4 font-bold text-md"
            onClick={() => {
              LoginBtn === "login"
                ? setLoginBtn("logout")
                : setLoginBtn("login");
            }}
          >
            {LoginBtn}
          </button>
          {/* <li className="px-4">
            <Link>{loggedInUser}</Link> */}
          {/* </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
