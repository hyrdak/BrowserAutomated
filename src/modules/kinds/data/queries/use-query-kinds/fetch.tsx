import { FetcherResponse } from 'interfaces/fetcher';
import axiosInstance from 'utils/fetcher';

interface FetcherResponseCustom {
    success: boolean
    status: number
    message: string | string[]
    error: any
    data: []
}
const getKinds = async (): Promise<FetcherResponseCustom> => {
    const { data: responseData } = await axiosInstance.get<FetcherResponseCustom>('/rest/v1/kind');

    return responseData;
};

export default getKinds;