import { Link } from "react-router-dom";
import "./RestaurantsList.css";
export const RestaurantsList = ({ data, isLoading }) => {
  return (
    <div className="restaurants-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex justify-center items-center">
          <div
            className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0 "
            style={{ marginTop: "5%" }}
          >
            {data.map((data) => (
              <div
                class="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
                key={data.id}
              >
                <div className="restaurant-card-header">
                  <h3 class="mb-3 text-xl font-bold text-indigo-600">
                    {data.name}
                  </h3>
                  <h4>Rate: {data.avg_rate}/5</h4>
                </div>
                <h1 class="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
                  Address: {data.city}, {data.address}
                </h1>
                <Link to={`restaurant/${data.id}`}>
                  <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">
                    See details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
