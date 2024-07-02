import { FetcherResponse } from 'interfaces/fetcher';
import axiosInstance from 'utils/fetcher';


const deleteKind = async (id: any): Promise<FetcherResponse<any>> => {
    const { data: responseData } = await axiosInstance.delete<FetcherResponse<any>>(
        '/rest/v1/kind?id=eq.' + id,
    );

    return responseData;
};

export default deleteKind;
