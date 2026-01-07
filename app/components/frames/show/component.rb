# frozen_string_literal: true

# frames
module Frames
  # show
  module Show
    # Component class
    class Component < ViewComponent::Base
      def initialize(frame:, tag_map:)
        @frame = frame
        @tag_map = tag_map
      end
    end
  end
end
