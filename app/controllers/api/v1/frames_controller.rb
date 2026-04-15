# frozen_string_literal: true

# frame api controller
class Api::V1::FramesController < Api::V1::ApiController
  include Api::Frames::Authentication::Skip
  include Api::Frames::Variables

  def comments
    # options = {}
    # options[:include] = [:user]
    render_comments(comments: comment_list)
  end

  private

  def comment_list
    Queries::Frame::ListCommentsWithUser.run(frame_id:)
  end
end
