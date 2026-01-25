# frozen_string_literal: true

# frame api controller
class Api::Front::V1::FramesController < Api::Front::V1::ApiController
  include Api::Frames::Authentication::Skip

  def comments
    comments = Queries::Frames::ListCommentsWithUser.run(frame_id: path_params[:frame_id])

    # options = {}
    # options[:include] = [:user]

    render json: CommentResource.new(comments).serialize
  end

  private

  def path_params
    @path_params ||= params.permit(:frame_id).to_h
  end
end
