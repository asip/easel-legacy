# frozen_string_literal: true

# frame api controller
class Api::V1::FramesController < Api::V1::AppController
  include Api::Frames::Authentication::Skip
  include Api::Frames::Variables
  include Api::Comments::Renderable

  def comments
    render_comments(comment_list)
  end

  private

  def comment_list
    Queries::Frame::ListCommentsWithUser.run(frame_id:)
  end
end
