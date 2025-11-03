# frozen_string_literal: true

# api
module Api
  # front
  module Front
    # v1
    module V1
      # Frames Controller
      class FramesController < Api::Front::V1::ApiController
        skip_before_action :authenticate, only: [ :comments ]

        def comments
          comments = Queries::Frames::ListCommentsWithUser.run(frame_id: path_params[:frame_id])

          # options = {}
          # options[:include] = [:user]

          render json: CommentResource.new(comments).serialize
        end

        private

        def path_params
          params.permit(:frame_id).to_h
        end
      end
    end
  end
end
