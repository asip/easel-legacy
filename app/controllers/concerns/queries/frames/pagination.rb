# frozen_string_literal: true

# queries
module Queries
  # frames
  module Frames
    # Pagination module
    module Pagination
      extend ActiveSupport::Concern

      include Pagy::Method

      protected

      def list_frames(user:, form:, page:)
        frame_ids = Queries::Frames::ListFrameIds.run(user:, form:)
        pagy, frame_ids = pagy(frame_ids, page:)
        frames = Frame.where(id: frame_ids).order(created_at: "desc")
        [ pagy, frames ]
      end
    end
  end
end
