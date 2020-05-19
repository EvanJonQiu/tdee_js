import fetch from "isomorphic-fetch";

function fetchData(url) {
  return fetch(url)
    .then((response) => {
      if (response.status >= 200 && response.status < 302) {
        return response;
      }

      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}

export { fetchData };
