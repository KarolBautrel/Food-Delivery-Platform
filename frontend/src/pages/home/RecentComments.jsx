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
        data.slice(0, 3).map((data) => (
          <div key={data.id} className="comment-card">
            <div className="recent-comments-header">
              <h3>
                {" "}
                {data.creator.name} on {data.restaurant}:
              </h3>
              <h4>Rate: {data.rate}/5</h4>
            </div>
            <p>{data.body}</p>
          </div>
        ))
      )}
    </div>
  );
};
