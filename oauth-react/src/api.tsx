import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});


export async function getAuth(): Promise<any> {
  try {
    const { data } = await api.get<any>("/");
    return data.toString();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getGhLogin(): Promise<any> {
  try {
    const { data } = await api.get<any>("/oauth2/authorization/github");
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
