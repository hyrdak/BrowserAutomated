import { useMutation } from '@tanstack/react-query'

import createKind from './fetch'

export function useMutationCreateKind() {
  return useMutation({
    mutationFn: createKind,
  })
}
