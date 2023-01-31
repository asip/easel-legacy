# frozen_string_literal: true

# api
module Api
  # Front
  module Front
    # v1
    module V1
      # Frames Controller
      class FramesController < ApiController
        skip_before_action :authenticate, only: [:index]
        before_action :set_query, only: [:index]

        def index
          frames = Frame.eager_load(:comments).search_by(word: @word)
          frames = frames.page(@page)

          render json: FrameSerializer.new(frames, index_options).serializable_hash
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
            :id,
            :q,
            :page,
            frame: %i[
              name
              tag_list
              comment
              file
              shooted_at
              confirming
            ]
          )
        end
        # rubocop:enable Metrics/MethodLength
      end
    end
  end
end
