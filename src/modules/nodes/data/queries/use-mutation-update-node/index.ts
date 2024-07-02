import { useMutation } from '@tanstack/react-query'

import updateNode from './fetch'

export function useMutationUpdateNode() {
  return useMutation({
    mutationFn: updateNode,
  })
}