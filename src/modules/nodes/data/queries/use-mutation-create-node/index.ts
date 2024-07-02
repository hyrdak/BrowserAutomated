import { useMutation } from '@tanstack/react-query'

import createNode from './fetch'

export function useMutationCreateNode() {
  return useMutation({
    mutationFn: createNode,
  })
}
