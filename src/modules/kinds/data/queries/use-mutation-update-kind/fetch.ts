
import { FetcherResponse } from 'interfaces/fetcher'
import axiosInstance from 'utils/fetcher'

const updateKind = async (
  params: any,
): Promise<FetcherResponse> => {
  console.log(params);
  
  const  {data: responseData} = await axiosInstance.patch<FetcherResponse>('/rest/v1/kind?id=eq.'+params.id, params)

  return responseData
}

export default updateKind
