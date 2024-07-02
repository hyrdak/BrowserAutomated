import { AxiosResponse } from 'axios'

import { FetcherResponse } from 'interfaces/fetcher'
import axiosInstance from 'utils/fetcher'

const createNode = async (
  body:any,
): Promise<FetcherResponse> => {

  const  {data: responseData} = await axiosInstance.post<FetcherResponse>('/rest/v1/nodes', {
    ...body
  })


  return responseData
}

export default createNode