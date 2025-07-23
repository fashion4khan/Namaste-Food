import { useState, useEffect } from "react";
import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { CDN_URL } from "../utils/constants";
import RestaurantCategory from "./restaurantCategory";
const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);
  // console.log(resId);
  // // const params = useParams();
  // // console.log(params);
  // useEffect(() => {
  //   fetchMenu();
  // }, []);

  // const fetchMenu = async () => {
  //   const data = await fetch(
  //     "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.0446525&lng=73.2909312&restaurantId="+resId+"&catalog_qa=undefined&submitAction=ENTER"
  //   );

  //   const json = await data.json();
  //   setResInfo(json.data);
  //   console.log(json.data);
  // };
  if (resInfo === null) {
    return <Shimmer />;
  }
  const {
    name,
    cuisines,
    costForTwoMessage,
    areaName,
    avgRating,
    totalRatingsString,
  } = resInfo?.cards?.[2]?.card?.card?.info;

  const itemCards =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
      ?.card?.itemCards ?? [];

  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  // console.log(categories);
  return (
    <div className="w-6/12 m-auto py-10">
      <h1 className="ml-6 text-3xl font-bold truncate">{name}</h1>
      <div className=" m-4 p-4 border border-solid black 1px rounded-lg shadow-2xl">
        <h3 className="text-lg font-bold">
          Rating {avgRating}.({totalRatingsString}) - {costForTwoMessage}
        </h3>
        <p className="text-amber-500 text-lg font-bold">
          {cuisines.join(", ")}
        </p>
        <span className="font-bold text-lg">Outlet</span>
        <span> - {areaName}</span>
      </div>
      <div className="flex justify-center">
        <h2>-- MENU --</h2>
      </div>
      {categories.map((category) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
