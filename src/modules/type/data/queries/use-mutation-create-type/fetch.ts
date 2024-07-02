import { AxiosResponse } from 'axios'

import { FetcherResponse } from 'interfaces/fetcher'
import axiosInstance from 'utils/fetcher'

const createType = async (
  body:any,
): Promise<FetcherResponse> => {
  console.log(body);
  

  const  {data: responseData} = await axiosInstance.post<FetcherResponse>('/rest/v1/type', {
    ...body
  })


  return responseData
}

export default createType