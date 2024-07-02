import { useMutation } from '@tanstack/react-query'

import updateType from './fetch'

export function useMutationUpdateType() {
  return useMutation({
    mutationFn: updateType,
  })
}