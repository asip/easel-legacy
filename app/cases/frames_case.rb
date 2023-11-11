# frozen_string_literal: true

# Frames Case
class FramesCase
  def create_frame(user:, form_params:)
    frame = Frame.new(form_params)
    save_frame(user:, frame:)
  end

  def update_frame(user:, frame_id:, form_params:)
    frame = Frame.find_by!(id: frame_id, user_id: user.id)
    frame.attributes = form_params
    save_frame(user:, frame:)
  end

  def save_frame(user:, frame:)
    frame.user_id = user.id
    success = frame.save
    [success, frame]
  end

  def delete_frame(user:, frame_id:)
    frame = Frame.find_by!(id: frame_id, user_id: user.id)
    frame.destroy
  end

  def list_query(word:)
    Frame.search_by(word:).order(created_at: 'desc')
  end

  def find_query(frame_id:)
    Frame.find(frame_id)
  end

  def find_query_with_user(user:, frame_id:)
    Frame.find_by!(id: frame_id, user_id: user.id)
  end

  def comments_query(frame_id:)
    frame = Frame.find_by!(id: frame_id)
    User.unscoped do
      Comment.eager_load(:user).where(frame_id: frame.id)
             .order(created_at: 'asc')
    end
  end
end
