import { Credentials } from "../types";
import { api } from "./client";

// auth service
export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const getSelf = () => api.get("/auth/self");
