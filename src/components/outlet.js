// import { createBrowserRouter } from "react-router-dom";
// import About from "./about";
// import Body from "./body";
// import Cart from "./cart";
// import Contact from "./contact";
// import Login from "./Login";
// import RestaurantMenu from "./restaurantMenu";
// const appRouter = createBrowserRouter([
//   { path: "/", element: <Login />, errorElement: <Error /> },
//   {
//     path: "/",
//     element: <AppLayout />,
//     children: [
//       { path: "/", element: <Body /> },
//       { path: "/about", element: <About /> },
//       { path: "/contact", element: <Contact /> },
//       { path: "/restaurants", element: <RestaurantMenu /> },
//       { path: "/restaurants/:resId", element: <RestaurantMenu /> },
//       { path: "/cart", element: <Cart /> },
//       {
//         path: "/grocery",
//         element: (
//           <Suspense>
//             {" "}
//             <InstaMart />{" "}
//           </Suspense>
//         ),
//       },
//     ],
//     errorElement: <Error />,
//   },
// ]);
// return (
//   <div>
//     {" "}
//     <RouterProvider router={appRouter} />{" "}
//   </div>
// );
