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
        frame_ids = Queries::Frames::ListFrameIds.run(items:)
        frames = Frame.where(id: frame_ids).order(created_at: "desc")
        pagy, frames = pagy(frames, page:)
        [ pagy, frames ]
      end
    end
  end
end
