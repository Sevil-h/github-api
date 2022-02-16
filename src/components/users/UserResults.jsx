import React, { useEffect } from "react";
import axios from "axios";

function UserResults() {
  useEffect(() => {
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
  // const fetchUsers = async () => {
  //   const response = await fetch(`${process.env.REACT_GITHUB_URL}/users`, {
  //     headers: {
  //       Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  //     },
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };
  return <div>user results</div>;
}

export default UserResults;
