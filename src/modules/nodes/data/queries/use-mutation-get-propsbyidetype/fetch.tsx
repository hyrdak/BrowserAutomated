import { FetcherResponse } from 'interfaces/fetcher';
import axiosInstance from 'utils/fetcher';


const getPropsByIdEType = async (id: any): Promise<FetcherResponse<any>> => {
    const { data: responseData } = await axiosInstance.post<FetcherResponse<any>>(
        '/rest/v1/rpc/getpropsbyidelementtype',{e: id}
    );

    return responseData;
};

export default getPropsByIdEType;