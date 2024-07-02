import { useMutation } from '@tanstack/react-query'

import updateKind from './fetch'

export function useMutationUpdateKind() {
  return useMutation({
    mutationFn: updateKind,
  })
}