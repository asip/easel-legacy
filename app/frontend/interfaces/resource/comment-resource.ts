export interface CommentResource {
  id: number | null
  frame_id: number
  body: string | null
  user_id: number
  user_name: string
  user_image_url: string
  created_at: string
  updated_at: string | null
}
