// import ResCard from "./restrocard";
// // import resObj from "../utils/mockData";
// import { useState } from "react";
// import { useEffect } from "react";
// import Shimmer from "./shimmer";
// import { Link } from "react-router-dom";
// // import useOnline from "../utils/useOnlineStatus";

// const Body = () => {
//   const [resList, setresList] = useState([]);
//   const [filterRestro, setFilterRestro] = useState([]);
//   const [searchText, setSearchText] = useState("");

//   const fetchData = async () => {
//     const data = await fetch(
//       "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4706878&lng=77.08306759999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
//     );
//     const json = await data.json();
//     const ListData =
//       json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
//         ?.restaurants;
//     setresList(ListData);
//     setFilterRestro(ListData);
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   // const isOnline = useOnline();

//   // if (!isOnline) {
//   //   return <h1>check your internet connectivity</h1>;
//   // }

//   if (!resList || resList.length === 0) {
//     return <Shimmer />;
//   }
//   return (
//     <div className="bodY">
//       <div className="Search m-4 px-4 flex items-center">
//         <input
//           type="text"
//           className="border border-solid black 1px"
//           value={searchText}
//           onChange={(e) => {
//             setSearchText(e.target.value);
//           }}
//         />
//         <button className="m-3 px-3 bg-blue-600 rounded-lg"
//           onClick={() => {
//             console.log(searchText);

//             const filterRestro = resList.filter((res) => {
//               return res.info.name
//                 .toLowerCase()
//                 .includes(searchText.toLowerCase());
//             });
//             setFilterRestro(filterRestro);
//           }}
//         >
//           search
//         </button>
//       </div>
//       <div className="m-4 px-4 flex">
//         <button
//           className="m-3 px-3 bg-neutral-500 rounded-2xl"
//           onClick={() => {
//             const filteredList = resList.filter(
//               (res) => res.info.avgRating > 4.2
//             );
//             console.log(filteredList);
//             setFilterRestro(filteredList);
//           }}
//         >
//           Top Rated Restaurant
//         </button>
//       </div>
//       <div className="flex flex-wrap p-12">
//         {filterRestro.map((restaurant) => (
//           <Link
//             key={restaurant.info.id}
//             to={"/restaurants/" + restaurant.info.id}
//           >
//             <ResCard resData={restaurant} />
//           </Link>
//         ))}
//         ;
//       </div>
//     </div>
//   );
// };

// export default Body;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResCard from "./restrocard";
import Shimmer from "./shimmer";

const Body = () => {
  const [resList, setResList] = useState([]);
  const [filterRestro, setFilterRestro] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageOffset, setPageOffset] = useState(0);

  const fetchData = async (offset = 0) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4706878&lng=77.08306759999999&offset=${offset}&page_type=DESKTOP_WEB_LISTING`
      );
      const json = await response.json();
      const restaurants =
        json?.data?.cards?.find(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setResList((prev) => (offset === 0 ? restaurants : [...prev, ...restaurants]));
      setFilterRestro((prev) => (offset === 0 ? restaurants : [...prev, ...restaurants]));
      setPageOffset((prev) => prev + restaurants.length);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const text = searchText.trim().toLowerCase();
    setFilterRestro(
      text === ""
        ? resList
        : resList.filter((r) => r.info.name.toLowerCase().includes(text))
    );
  };

  const handleLoadMore = () => {
    fetchData(pageOffset);
  };

  if (loading && resList.length === 0) return <Shimmer />;

  return (
    <div className="bodY">
      <div className="m-4 px-4 flex items-center">
        <input
          type="text"
          className="border border-black px-2 py-1"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="m-3 px-3 bg-blue-600 text-white rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="m-4 px-4">
        <button
          className="px-4 py-2 bg-neutral-500 text-white rounded-2xl"
          onClick={() =>
            setFilterRestro(resList.filter((res) => res.info.avgRating > 4.2))
          }
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="flex flex-wrap p-12">
        {filterRestro.map((restaurant,index) => (
          <Link
            key={`${restaurant.info.id}-${index}`}
            to={"/restaurants/" + restaurant.info.id}
          >
            <ResCard resData={restaurant} />
          </Link>
        ))}
      </div>

      {filterRestro.length > 0 && (
        <div className="text-center my-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More Restaurants"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Body;
