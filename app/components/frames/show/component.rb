# frozen_string_literal: true

# frames
module Frames
  # show
  module Show
    # Component class
    class Component < ViewComponent::Base
      def initialize(frame:)
        @frame = frame
        @tag_map = Frame.tag_map(frame: @frame)
      end
    end
  end
end
