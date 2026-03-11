import { storeToRefs } from 'pinia'

import type { Comment, CommentResource, CommentsResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

import { useQueryApi, useEntity, useAlert, useFlash } from '~/composables'
import { useCommentsStore } from '~/stores'

export function useComments() {
  const { flash, clearFlash } = useFlash()
  const { create } = useEntity<Comment, CommentResource>()
  // const { token } = useAccount()
  const { comments } = storeToRefs(useCommentsStore())

  const { setError } = useAlert({ flash })

  const makeComment = ({ from }: { from: CommentResource }): Comment => {
    return create({ from })
  }

  const getComments = async (frameId: string): Promise<void> => {
    clearFlash()
    //console.log(frameId)

    const { data, error } = await useQueryApi<
      CommentsResource,
      ErrorsResource<ErrorMessages<string>>
    >(`/frames/${frameId}/comments`)

    if (error) {
      setError(error)
    } else {
      const commentList: [CommentResource] | undefined = data?.comments
      //console.log(comment_list);
      comments.value.splice(0, comments.value.length)
      if (commentList) {
        for (const comment of commentList) {
          //console.log(comment);
          comments.value.push(makeComment({ from: comment }))
        }
      }
    }
    //console.log(comments);
  }

  return { comments, getComments, flash }
}
