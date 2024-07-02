import { QUERY_KEYS } from 'constants-es';

import { useQuery } from '@tanstack/react-query';

import getTypes from './fetch';

export function useQueryGetType(enabled: boolean = true) {
    return useQuery({
        queryKey: [QUERY_KEYS.TYPES],
        queryFn: getTypes,
    });
}
