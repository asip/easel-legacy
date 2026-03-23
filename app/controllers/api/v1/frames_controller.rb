# frozen_string_literal: true

# frame api controller
class Api::V1::FramesController < Api::V1::ApiController
  include Api::Frames::Authentication::Skip

  def comments
    comments = Queries::Frame::ListCommentsWithUser.run(frame_id: path_params[:frame_id])

    # options = {}
    # options[:include] = [:user]
    render_comments(comments:)
  end

  private

  def path_params
    @path_params ||= params.permit(:frame_id).to_h
  end
end
