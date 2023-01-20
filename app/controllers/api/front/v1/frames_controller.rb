# frozen_string_literal: true

# Api
module Api
  # Front
  module Front
    # V1
    module V1
      # Frames Controller
      class FramesController < Api::Front::V1::ApiController
        include Pagination

        skip_before_action :authenticate, only: [:index]
        before_action :set_query, only: [:index]

        def index
          frames = Frame.eager_load(:comments).search_by(word: @word)
          frames = frames.page(@page)
          pagination = resources_with_pagination(frames)

          render json: FrameSerializer.new(frames, index_options).serializable_hash.merge(pagination)
        end

        def show
          frame = Frame.eager_load(:comments).find_by(id: params[:id])

          render json: FrameSerializer.new(frame, index_options).serializable_hash
        end

        private

        def index_options
          { include: [:comments] }
        end

        def set_query
          @word = permitted_params[:q]
          @page = permitted_params[:page]
        end

        # rubocop:disable Metrics/MethodLength
        def permitted_params
          params.permit(
            :q,
            :page
          )
        end
        # rubocop:enable Metrics/MethodLength
      end
    end
  end
end
