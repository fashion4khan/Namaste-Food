import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResCard from "./restrocard";
import Shimmer from "./shimmer";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchData = async (newOffset = 0) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4706878&lng=77.08306759999999&offset=${newOffset}&page_type=DESKTOP_WEB_LISTING`
      );
      const json = await res.json();

      const newRestaurants =
        json?.data?.cards?.find(
          (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setRestaurants((prev) =>
        newOffset === 0 ? newRestaurants : [...prev, ...newRestaurants]
      );
      setFiltered((prev) =>
        newOffset === 0 ? newRestaurants : [...prev, ...newRestaurants]
      );
      setOffset((prev) => prev + newRestaurants.length);
    } catch (err) {
      console.error("Failed to fetch restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const text = searchText.trim().toLowerCase();
    if (!text) return setFiltered(restaurants);
    setFiltered(
      restaurants.filter((r) => r.info.name.toLowerCase().includes(text))
    );
  };

  const handleLoadMore = () => {
    fetchData(offset);
  };

  if (loading && restaurants.length === 0) return <Shimmer />;
  return (
    <div className="pt-24 bg-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center p-4 rounded-lg">
        <div className="flex w-full ml-16 md:w-3/4 items-center">
          <input
            type="text"
            className="flex-grow border border-gray-400 pl-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search Restaurants..."
          />
          <button
            onClick={handleSearch}
            className="bg-orange-500 hover:bg-orange-700 cursor-pointer text-white font-semibold px-4 py-2 ml-2 rounded-r-md transition-colors"
          >
            Search
          </button>
        </div>

        <div className="mr-22">
          <button
            onClick={() =>
              setFiltered(restaurants.filter((r) => r.info.avgRating > 4.3))
            }
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Top Rated Restaurant
          </button>
        </div>
      </div>

      <div className="flex flex-wrap p-12 pt-0">
        {filtered.map((res, index) => (
          <Link
            key={`${res.info.id}-${index}`}
            to={`/restaurants/${res.info.id}`}
            className="cursor-pointer"
          >
            <ResCard resData={res} />
          </Link>
        ))}
      </div>

      {filtered.length > 0 && (
        <div className="text-center my-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Body;
