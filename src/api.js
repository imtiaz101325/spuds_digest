import queryString from "query-string";

// This should be an environment variable consider refactoring later
const API_KEY = "cd890f94a756b1518a2a17617a5b430e";

const baseURL = "https://api.themoviedb.org/3/";

const getURL = (route, query) => {
  if (query) {
    return `${baseURL}${route}?api_key=${API_KEY}&${queryString.stringify(
      query
    )}`;
  }

  return `${baseURL}${route}?api_key=${API_KEY}`;
};

export const buildConfig = (method = "GET", mode = "cors", token) => {
  const base = {
    headers: new Headers({
      "Content-Type": "application/json;charset=utf-8"
    })
  };

  return {
    ...base,
    method,
    mode
  };
};

const handleErrors = response => {
  return new Promise((resolve, reject) => {
    const res = response.clone();

    if (!response.ok) {
      response.text().then(text => {
        reject(text);
      });
    } else {
      resolve(res);
    }
  });
};

const parseJSON = response => {
  return new Promise((resolve, reject) => {
    const { ok, redirected, status, statusText, type, url } = response;

    response
      .text()
      .then(text => {
        if (text) {
          resolve({
            ok,
            redirected,
            status,
            statusText,
            type,
            url,
            json: JSON.parse(text)
          });
        } else {
          resolve({
            ok,
            redirected,
            status,
            statusText,
            type,
            url,
            empty: true
          });
        }
      })
      .catch(err => reject(err));
  });
};

export const request = (route, options, query) => {
  return new Promise((resolve, reject) => {
    fetch(getURL(route, query), options)
      .then(handleErrors)
      .then(parseJSON)
      .then(response => {
        if (response.empty) {
          return resolve(response);
        } else {
          return resolve(response.json);
        }
      })
      .catch(err => reject(JSON.parse(err)));
  });
};
