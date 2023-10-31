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
          comments = Frame.eager_load(comments: :user).find_by!(id: path_params[:frame_id]).comments
                          .order('comments.created_at': 'asc')

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
