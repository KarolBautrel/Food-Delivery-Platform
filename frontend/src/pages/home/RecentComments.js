import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./RecentComments.css";
export const RecentComments = () => {
  const { data, isLoading, isError } = useFetch("/api/comments");
  return (
    <div className="recent-comments-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data.slice(0, 3).map((data) => (
          <div key={data.id} className="comment-card">
            <div className="header">
              <h3> {data.creator.name} wrote:</h3>
              <h4>Rate: {data.rate}</h4>
            </div>
            <p>{data.body}</p>
          </div>
        ))
      )}
    </div>
  );
};
