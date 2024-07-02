import { FetcherResponse } from 'interfaces/fetcher'
import axiosInstance from 'utils/fetcher'

import { RequestRegisterBody, RequestRegisterResponseData } from './interfaces'

const requestRegister = async (
  body: RequestRegisterBody,
): Promise<FetcherResponse<RequestRegisterResponseData>> => {
  console.log(body);
  
  const  {data: responseData} = await axiosInstance.post<FetcherResponse<RequestRegisterResponseData>>('/auth/v1/signup',{
    ...body,
  })

  return responseData
}

export default requestRegister