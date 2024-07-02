import { QUERY_KEYS } from 'constants-es';

import { useQuery } from '@tanstack/react-query';

import getElementType from './fetch';

export function useQueryGetElementType(enabled: boolean = true) {
    return useQuery({
        queryKey: [QUERY_KEYS.ETYPES],
        queryFn: getElementType,
    });
}
