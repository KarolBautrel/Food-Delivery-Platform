import useFetch from "../../hooks/useFetch";
import "./RecentComments.css";
export const RecentComments = () => {
  const { data, isLoading, isError } = useFetch("/api/comments");

  return (
    <div className="recent-comments-container">
      <h3>Recent comments</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="min-h-screen  justify-center items-center mt-5">
          {data.slice(0, 3).map((data) => (
            <div
              className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
              key={data.id}
            >
              <div className="recent-comments-header">
                <h3>
                  {" "}
                  {data.creator.name} on {data.restaurant}:
                </h3>
                <h4>Rate: {data.rate}/5</h4>
              </div>
              <p>{data.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
