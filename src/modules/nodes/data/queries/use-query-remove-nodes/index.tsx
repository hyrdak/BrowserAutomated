import { useMutation } from '@tanstack/react-query'

import deleteNode from './fetch'

export function useMutationDeleteNode() {
  return useMutation({
    mutationFn: deleteNode,
  })
}

