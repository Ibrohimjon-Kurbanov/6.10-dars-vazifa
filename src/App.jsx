import Pagination from "@mui/material/Pagination";
import "./App.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const current = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_page=${current}&_limit=${limit}`
      )
      .then((response) => {
        if (response.status == 200) {
          setPosts(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [current, limit]);

  function handlePaginate(event, position) {
    setSearchParams({ page: position, limit });
  }
  function handleLimitChange(event) {
    const limitValue = Number(event.target.value);
    setSearchParams({ page: 1, limit: limitValue });
  }

  return (
    <div className="wrapper">
      <div className="row">
        {posts.length > 0 &&
          posts.map((post, index) => {
            return (
              <div key={index} className="col">
                <h3>Title: {post.title}</h3>
                <p>Text: {post.body}</p>
              </div>
            );
          })}
      </div>
      <div className="pagenate-wrapper">
        <div className="pagenation">
          <Pagination
            onChange={handlePaginate}
            count={10}
            variant="outlined"
            color="primary"
            page={current}
          />
        </div>
        <select value={limit} onChange={handleLimitChange}>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  );
}
export default App;
