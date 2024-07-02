import { QUERY_KEYS } from 'constants-es';

import { useQuery } from '@tanstack/react-query';

import getNodes from './fetch';

export function useQueryGetNodes(enabled: boolean = true) {
    return useQuery({
        queryKey: [QUERY_KEYS.NODES],
        queryFn: getNodes,
    });
}