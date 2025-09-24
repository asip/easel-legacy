# frozen_string_literal: true

# queries
module Queries
  # frames
  module Frames
    # Pagination module
    module Pagination
      extend ActiveSupport::Concern

      include Pagy::Backend

      protected

      def list_frames(items:, page:)
        frames = Queries::Frames::ListFrames.run(items:)
        frame_ids = frames.pluck(:id)
        frames = Frame.where(id: frame_ids).order(created_at: "desc")
        pagy, frames = pagy(frames, page:)
        [ pagy, frames ]
      end
    end
  end
end
