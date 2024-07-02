import { QUERY_KEYS } from 'constants-es';

import { useQuery } from '@tanstack/react-query';

import getKinds from './fetch';

export function useQueryGetKind(enabled: boolean = true) {
    return useQuery({
        queryKey: [QUERY_KEYS.KINDS],
        queryFn: getKinds,
    });
}
