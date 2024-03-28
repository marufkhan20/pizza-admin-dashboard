import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getSelf } from "../http/api";
import { useAuthStore } from "../store";

const getSelfData = async () => {
  const { data } = await getSelf();
  return data;
};

const Root = () => {
  const { setUser } = useAuthStore();

  // get self data
  const { data, isPending } = useQuery({
    queryKey: ["self"],
    queryFn: getSelfData,
    retry: (failureCount: number, error) => {
      console.log("error", error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default Root;
