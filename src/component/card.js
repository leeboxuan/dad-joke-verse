import { getJokes } from "../service/jokes-service";
import Loader from "./loader";
import { Button } from "@material-tailwind/react";

import { useEffect, useState } from "react";
import "../styles/Card.css"; // You'll need to create a CSS file for the card styles.

function Card() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false); // Add flip state

  useEffect(() => {


    fetchData();
  }, []);

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center", // Horizontally center the button
    alignItems: "center", // Vertically center the button
    marginTop: "10px", // Adjust the margin as needed
  };
  const fetchData = async () => {
    try {
      const response = await getJokes();
      setData(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const toggleFlip = () => {
    if (data && data.setup) {
      setIsFlipped(!isFlipped);
    }
  };

  const refreshCard = () => {
    setIsLoading(true); // Set loading state to true
    fetchData(); // Fetch new data
  };

  return (
    <>
      <div
        className={`card ${
          isFlipped ? "flipped" : ""
        } flex flex-col border-2 border-black overflow-hidden p-8 rounded-xl shadow-large bg-yellow-200 w-80`}
        onClick={() => toggleFlip()}
      >
        <div className="card-inner items-center w-full justify-center grid grid-cols-1 text-left">
          <div className="card-front">
            {isLoading && <Loader />}

            {!isLoading && data && (data.joke || data.setup) ? (
              <h2 className="text-black font-bold text-lg lg:text-3xl">
                {data.joke ? data.joke : data.setup}
              </h2>
            ) : (
              <p>No data available</p>
            )}
          </div>
          <div className="card-back">
            {data && data.delivery && (
              <h2 className="text-black font-bold text-lg lg:text-2xl">
                {data.delivery}
              </h2>
            )}
          </div>
        </div>
      </div>
      <div style={buttonContainerStyle}>
      <button
        className="rounded-xl bg-navy-700 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-navy-800 active:bg-navy-900 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
        onClick={refreshCard}
      >
        refresh
      </button>
    </div>
    </>
  );
}

export default Card;
