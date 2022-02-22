import { useContext } from "react";
import axios from "axios";
import GithubContext from "../../context/github/GithubContext";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

// Get search results
export const searchUsers = (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  axios
    .get(`${GITHUB_URL}/search/users?${params}`)
    .then((response) => {
      response.data.items;
      console.log(response.data.items);
    })
    .catch((error) => console.log(error));
};

// export const searchUsers = async (text) => {
//   const params = new URLSearchParams({
//     q: text,
//   });

//   const response = await github.get(`/search/users?${params}`);
//   return response.data.items;
// };

// Get user and repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};

//  get a single user
// export const getUser = async (login) => {
//   const response = await fetch(`${GITHUB_URL}/users/${login}`, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//     },
//   });
//   if (response.staatus === 401) {
//     window.location = "/notfound";
//   } else {
//     const data = await response.json();
//     return data;
//   }
// };

// get user repos
// export const getUserRepos = async (login) => {
//   const response = await fetch(`${GITHUB_URL}/users?${login}/repos`, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//     },
//   });

//   const data = await response.json();
//   return data;
// };
