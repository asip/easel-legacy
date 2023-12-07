# frozen_string_literal: true

# queries
module Queries
  # frames
  module Frames
    # FindFrame
    class FindFrameByUser
      include Query

      def initialize(user:, frame_id:)
        @user = user
        @frame_id = frame_id
      end

      def execute
        Frame.find_by!(id: @frame_id, user_id: @user.id)
      end
    end
  end
end
