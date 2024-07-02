import { useEffect, useState } from 'react';
import { QUERY_KEYS } from 'constants-es';
import { useAppSelector } from 'libs/redux';

import { useQuery } from '@tanstack/react-query';

import getWorkflows from './fetch';

export function useQueryGetWorkflows(id: any) {
    return useQuery({
        queryKey: [QUERY_KEYS.WORKFLOWS],
        queryFn: () => getWorkflows(id),
    });
}

export * from './interfaces';