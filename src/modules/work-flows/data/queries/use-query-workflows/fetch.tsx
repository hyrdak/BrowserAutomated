import { FetcherResponse } from 'interfaces/fetcher';
import axiosInstance from 'utils/fetcher';

import { WorkflowResponse } from './interfaces';

const getWorkflows = async (userId:any): Promise<FetcherResponse<WorkflowResponse[]>> => {
    
    const { data: responseData } = await axiosInstance.get<FetcherResponse<WorkflowResponse[]>>(
        `/rest/v1/flows?user_id=eq.` + userId,
    );

    return responseData;
};

export default getWorkflows;