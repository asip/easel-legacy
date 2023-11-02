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

        def comments
          frame = Frame.find_by!(id: path_params[:frame_id])
          comments = Comment.eager_load(:user).where(frame_id: frame.id)
                            .order(created_at: 'asc')

          # options = {}
          # options[:include] = [:user]

          render json: CommentSerializer.new(comments).serializable_hash
        end

        private

        def path_params
          params.permit(:frame_id)
        end
      end
    end
  end
end
