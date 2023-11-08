# frozen_string_literal: true

# api
module Api
  # front
  module Front
    # v1
    module V1
      # Frames Controller
      class FramesController < Api::Front::V1::ApiController
        skip_before_action :authenticate, only: [:comments]

        before_action :set_case

        def comments
          comments = @case.comments_query(frame_id: path_params[:frame_id])

          # options = {}
          # options[:include] = [:user]

          render json: CommentSerializer.new(comments).serializable_hash
        end

        private

        def set_case
          @case = FramesCase.new
        end

        def path_params
          params.permit(:frame_id)
        end
      end
    end
  end
end
