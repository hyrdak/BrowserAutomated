import { useMutation } from '@tanstack/react-query'

import deleteKind from './fetch'

export function useMutationDeleteKind() {
  return useMutation({
    mutationFn: deleteKind,
  })
}

