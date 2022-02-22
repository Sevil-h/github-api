import { createContext, useReducer } from "react";
import axios from "axios";
import githubReducer from "./GithubReducer";
import { createDocumentRegistry } from "typescript";

const GithubContext = createContext();

const GITHUB_URL = "https://api.github.com";
const GITHUB_TOKEN = "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";

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispacth] = useReducer(githubReducer, initialState);

  // Clear Users
  const clearUsers = () => dispacth({ type: "CLEAR_USERS" });

  // Set Loading
  const setLoading = () => dispacth({ type: "SET_LOADING" });

  //  getSearchResults
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();

    dispacth({
      type: "GET_USERS",
      payload: items,
    });
  };

  //  get a single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    if (response.staatus === 401) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      dispacth({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  // get user repos
  const getUserRepos = async (login) => {
    const response = await fetch(`${GITHUB_URL}/users?${login}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    dispacth({
      type: "GET_REPOS",
      payload: data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        getUserRepos,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
