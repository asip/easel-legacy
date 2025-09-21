# frozen_string_literal: true

# queries
module Queries
  # sessions
  module Sessions
    # Pagination module
    module Pagination
      extend ActiveSupport::Concern

      include Pagy::Backend

      protected

      def list_frames(user:, page:)
        frames = Queries::Users::ListFrames.run(user:)
        pagy, frames = pagy(frames, page:)
        [ pagy, frames ]
      end
    end
  end
end
