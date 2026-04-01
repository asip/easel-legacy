# frozen_string_literal: true

# frame api controller
class Api::V1::FramesController < Api::V1::ApiController
  include Api::Frames::Authentication::Skip

  def comments
    # options = {}
    # options[:include] = [:user]
    render_comments(comments: comment_list)
  end

  private

  def comment_list
    Queries::Frame::ListCommentsWithUser.run(frame_id: route_params[:frame_id])
  end

  def route_params
    @route_params ||= params.permit(:frame_id).to_h
  end
end
