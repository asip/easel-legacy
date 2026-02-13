import { storeToRefs } from 'pinia'

import type { Comment, CommentResource, CommentsResource } from '~/interfaces'
import { useQueryApi, useEntity, useAlert, useConstants, useFlash } from '~/composables'
import { useCommentsStore } from '~/stores'

import { i18n } from '~/i18n'

export function useComments() {
  const { baseURL } = useConstants()
  const { flash, clearFlash } = useFlash()
  const { create } = useEntity<Comment, CommentResource>()
  // const { token } = useAccount()
  const { comments } = storeToRefs(useCommentsStore())

  const { setAlert } = useAlert({ flash })

  const makeComment = ({ from }: { from: CommentResource }): Comment => {
    return create({ from })
  }

  const getComments = async (frameId: string): Promise<void> => {
    clearFlash()
    //console.log(frameId)

    try {
      const { data, response } = await useQueryApi<CommentsResource>({
        url: `${baseURL}/frames/${frameId}/comments`,
      })

      if (!response.ok) {
        await setAlert({ response })
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
    } catch (error) {
      flash.value.alert = i18n.global.t('action.error.api', { message: (error as Error).message })
      globalThis.console.log((error as Error).message)
    }
  }

  return { comments, getComments, flash }
}
