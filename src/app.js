import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/body";
import Header from "./components/header";
import About from "./components/about";
import Contact from "./components/contact";
import Cart from "./components/cart";
import Error from "./components/error";
import RestaurantMenu from "./components/restaurantMenu";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
// import UserContext from "./utils/userContext";
import { Provider } from "react-redux";
import AppStore from "./utils/appStore";

const InstaMart = lazy(() => import("./components/grocery"));

const AppLayout = () => {
  // const [userName, setUserName] = useState();

  // useEffect(() => {
  //   const data = {
  //     name: "fashion khan",
  //   };
  //   setUserName(data.name);
  // }, []);

  return (
    // <UserContext.Provider value={{ loggedInUser: userName }}>
    <Provider store={AppStore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
      {/* // </UserContext.Provider> */}
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants",
        element: <RestaurantMenu />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense>
            <InstaMart />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
