import { FetcherResponse } from 'interfaces/fetcher';
import axiosInstance from 'utils/fetcher';

const getNodes = async (): Promise<FetcherResponse> => {
    const { data: responseData } = await axiosInstance.post<FetcherResponse>('/rest/v1/rpc/getnodes');
    
    return responseData;
};

export default getNodes;
