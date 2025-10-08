import { ref } from 'vue'

import type { Comment , CommentResource, CommentsResource } from '../interfaces'
import { useAlert, useConstants, useFlash } from './'

export function useComments() {
  const comments = ref<Comment[]>([])

  const { flash, clearFlash } = useFlash()

  const { baseURL, headers } = useConstants()

  const { setAlert } = useAlert({ flash })

  const getComments = async (frameId: string) => {
    clearFlash()
    //console.log(frame_id)

    try{
      const response = await globalThis.fetch(`${baseURL}/frames/${frameId}/comments`,
        {
          method: 'GET',
          headers: headers.value
        })

      if (!response.ok) {
        await setAlert({ response })
      } else {
        const commentList: [CommentResource] = (await response.json() as CommentsResource).comments
        //console.log(comment_list);
        comments.value.splice(0, comments.value.length)
        for (const comment of commentList) {
        //console.log(comment);
          comments.value.push(createCommentFromJson(comment))
        }
      }
      //console.log(comments);
    } catch (error) {
      flash.value.alert = '不具合が発生しました'
      globalThis.console.log((error as Error).message)
    }
  }

  const createCommentFromJson = (resource: CommentResource): Comment => {
    const comment: Partial<Comment> = {}
    Object.assign(comment, resource)
    return comment as Comment
  }

  return { comments, getComments, flash }
}

export type UseCommentsType = ReturnType<typeof useComments>
