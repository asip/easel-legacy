# frozen_string_literal: true

# queries
module Queries
  # users
  module Users
    # Pagination module
    module Pagination
      extend ActiveSupport::Concern

      include Pagy::Backend

      protected

      def list_frames(user_id:, page:)
        frames = Queries::Users::ListPublicFrames.run(user_id:)
        pagy, frames = pagy(frames, page:)
        [ pagy, frames ]
      end
    end
  end
end
