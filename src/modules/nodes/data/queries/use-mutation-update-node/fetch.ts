import { FetcherResponse } from 'interfaces/fetcher'
import axiosInstance from 'utils/fetcher'

const updateNode = async (
  params: any,
): Promise<FetcherResponse> => {

  const  {data: responseData} = await axiosInstance.patch<FetcherResponse>('/rest/v1/nodes?id=eq.'+params.id, 
    params
  )

  return responseData
}

export default updateNode
