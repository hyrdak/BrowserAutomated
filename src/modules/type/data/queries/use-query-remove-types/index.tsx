import { useMutation } from '@tanstack/react-query'

import deleteType from './fetch'

export function useMutationDeleteType() {
  return useMutation({
    mutationFn: deleteType,
  })
}

