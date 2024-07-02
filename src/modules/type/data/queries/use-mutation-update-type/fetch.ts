import { FetcherResponse } from 'interfaces/fetcher'
import axiosInstance from 'utils/fetcher'

const updateType = async (
  params: any,
): Promise<FetcherResponse> => {
  console.log(params);
  
  const  {data: responseData} = await axiosInstance.patch<FetcherResponse>('/rest/v1/type?id=eq.'+params.id, params)

  return responseData
}

export default updateType
