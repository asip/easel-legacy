# frozen_string_literal: true

# queries
module Queries
  # frames
  module Frames
    # FindFrame
    class FindFrame
      include Query

      def initialize(frame_id:)
        @frame_id = frame_id
      end

      def execute
        Frame.find(@frame_id)
      end
    end
  end
end
