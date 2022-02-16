import React, { useEffect } from "react";
import axios from "axios";

function UserResults() {
  useEffect(() => {
    console.log(`${process.env.REACT_APP_GITHUB_URL}`);
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get(`${process.env.REACT_APP_GITHUB_URL}/users`)
      .then((res) => {
        const data = res.data;
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <div>user results</div>;
}

export default UserResults;
