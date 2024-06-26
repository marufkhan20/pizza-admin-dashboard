import { CreateUserData, Credentials } from "../types";
import { api } from "./client";

// auth service
export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);
export const getSelf = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");
export const getUsers = () => api.get("/users");
export const getTenants = () => api.get("/tenants");
export const createUser = (user: CreateUserData) => api.post("/users", user);
