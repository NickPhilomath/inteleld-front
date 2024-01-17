import { AxiosRequestConfig, CanceledError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";

const useRequest = <T>(endpoint: string, redirectOn401: boolean = false, requestConfig?: AxiosRequestConfig) => {
  const [resData, setResData] = useState<T>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  //
  const navigate = useNavigate();

  const post = (data: any, callback: Function = ()=>{}) => {
    // clean before fetching
    setLoading(true);
    setError("");
    apiClient
      .post<T>(endpoint, data, { ...requestConfig })
      .then((res) => {
        setResData(res.data);
        setLoading(false);
        callback(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);

        if (redirectOn401) navigate('/login')
      });
  }

  return { post, resData, error, isLoading };
};

export default useRequest;