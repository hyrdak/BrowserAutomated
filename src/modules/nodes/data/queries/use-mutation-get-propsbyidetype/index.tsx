import { useMutation } from '@tanstack/react-query'

import getPropsByIdEType from './fetch'

export function useMutationGetPropsByIdEType() {
  return useMutation({
    mutationFn: getPropsByIdEType,
  })
}