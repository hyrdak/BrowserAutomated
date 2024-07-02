import { FetcherResponse } from 'interfaces/fetcher';
import axiosInstance from 'utils/fetcher';


const deleteType = async (id: any): Promise<FetcherResponse<any>> => { 
    const { data: responseData } = await axiosInstance.delete<FetcherResponse<any>>(
        '/rest/v1/type?id=eq.' + id,
    );

    return responseData;
};

export default deleteType;
