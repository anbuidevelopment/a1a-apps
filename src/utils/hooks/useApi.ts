import axios from "axios";
import {useEffect, useState} from "react";

const api = (params? : any, basePath: string = "") => axios.create({
    baseURL: "http://localhost:8080" + basePath,
    params: params,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

interface ApiRequest<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
}

interface ApiResponse<T> {
    code: number;
    message?: string;
    data: T
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete';


export const useApi = <T>(
    url: string, method: HttpMethod = 'get',
    params?: any,
    body?: object,
    basePath: string = "",
    callback?: () => void,
): ApiRequest<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    let jsonBody = JSON.stringify(body)
    let jsonParams = JSON.stringify(params)
    let jsonBasePath = JSON.stringify(basePath)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                let response;
                if (method === 'get') {
                    response = await api(params, basePath).get<ApiResponse<T>>(url)
                } else if (method === 'post') {
                    response = await api(params, basePath).post<ApiResponse<T>>(url, body)
                } else if (method === 'put') {
                    response = await api(params, basePath).put<ApiResponse<T>>(url, body)
                } else if (method === 'delete') {
                    response = await api(params, basePath).delete<ApiResponse<T>>(url, body)
                }
                setData(response?.data.data ?? null)
                if (callback) {
                    callback()
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        void fetchData()

    }, [jsonBody, method, url, jsonParams, jsonBasePath])
    return {data, error, loading}
}

