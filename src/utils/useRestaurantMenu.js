import { useState, useEffect, use } from "react";
import { MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const data = await fetch(MENU_API + resId);

    const json = await data.json();

    setResInfo(json.data);
  }

  return resInfo;
};

export default useRestaurantMenu;
