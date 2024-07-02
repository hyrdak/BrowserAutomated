import { FetcherResponse } from 'interfaces/fetcher';
import axiosInstance from 'utils/fetcher';


const deleteNode = async (id: any): Promise<FetcherResponse<any>> => {
    const { data: responseData } = await axiosInstance.delete<FetcherResponse<any>>(
        '/rest/v1/nodes?id=eq.' + id,
       
    );

    return responseData;
};

export default deleteNode;
