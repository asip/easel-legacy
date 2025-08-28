export interface Comment {
  id: number | undefined
  frame_id: number | null
  body: string
  user_id: number | null
  user_name: string
  user_image_url: string
  created_at: string
  updated_at: string | null
}
