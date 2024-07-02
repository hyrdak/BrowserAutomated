import { useMutation } from '@tanstack/react-query'

import createType from './fetch'

export function useMutationCreateType() {
  return useMutation({
    mutationFn: createType,
  })
}
