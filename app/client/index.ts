import axios, {AxiosResponse, Method} from "axios";
import { Endpoint } from '~/models/Endpoint';

export const saveApi = (data: Endpoint): Promise<AxiosResponse> =>
  axios.post("/add-api", JSON.stringify(data), {headers: {'Content-Type': 'application/json'}})

export const updateApi = (data: Endpoint, requestUrl: string): Promise<AxiosResponse> =>
  axios.put(`/add-api?endpoint=${requestUrl}`, data, {headers: {'Content-Type': 'application/json'}})

export const fetchApiResponse = (api: Endpoint): Promise<AxiosResponse> => axios(`/api-mocker/${api.requestUrl}`, {
  method: api.method as Method
})

export const fetchApiDetail = (requestUrl: string): Promise<AxiosResponse> => axios.get(`/get-mock?endpoint=${requestUrl}`)

export const deleteApi = (apiUrl: string): Promise<AxiosResponse> => axios.delete("/remove-api", {params: {endpoint: apiUrl}})