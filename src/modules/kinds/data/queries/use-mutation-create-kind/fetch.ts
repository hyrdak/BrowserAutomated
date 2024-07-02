import { AxiosResponse } from 'axios'

import { FetcherResponse } from 'interfaces/fetcher'
import axiosInstance from 'utils/fetcher'

const createKind = async (
  body:any,
): Promise<FetcherResponse> => {
  console.log(body);
  

  const  {data: responseData} = await axiosInstance.post<FetcherResponse>('/rest/v1/kind', {
    ...body
  })


  return responseData
}

export default createKind