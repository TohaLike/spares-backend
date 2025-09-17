import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class ApiService {
  apiUrl;
  password;
  login;
  accessToken;

  constructor() {
    this.apiUrl = process.env.API_URL;
    this.password = process.env.API_PASSWORD;
    this.login = process.env.API_LOGIN;
  }

  async auth() {
    const response = await axios.post(`${this.apiUrl}/auth`, {
      headers: {
        Authorization: "Bearer",
        Accept: "application/json",
      },
      data: {
        login: this.login,
        password: this.password,
      },
    });

    this.accessToken = response.data.result.accessToken;

    return response.data;
  }

  async getDetails(code, refreshToken) {
    const response = await axios.get(
      `${this.apiUrl}/parts/by-searchcode/${code}`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          Accept: "application/json",
        },
      }
    );

    return { details: response.data.result };
  }
}

export const apiService = new ApiService();
