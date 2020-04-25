import config from "./config";

export default class Data {
  //! first method
  //* API endpoint = 'path'
  api(
    path,
    method = "GET",
    body = null,
    requireAuth = false,
    credentials = null
  ) {
    //* "http://localhost:5000/api/PATH"
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type":
          "application/json; charset=utf-8",
      },
    };
    //! if body is provided, sends "method", "headers" and "stringified body".
    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    // Check if auth is required
    if (requireAuth) {
      //* The btoa() method creates a base-64 encoded ASCII string from a "string" of data. We'll use btoa() to encode the username and password credentials passed to the api() method. The credentials will be passed as an object containing username and password properties.
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      // push auth to header
      options.headers[
        "Authorization"
      ] = `Basic ${encodedCredentials}`;
    }
    //* fetch() accepts an optional second parameter: a configuration object that lets you control a number of different settings you can apply to the request.
    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api(
      `/users`,
      "GET",
      null,
      true,
      { username, password }
    );
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api(
      "/users",
      "POST",
      user
    );
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
