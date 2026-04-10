# frozen_string_literal: true

# frames
module Frames
  # profile
  module Profile
    # Component class
    class Component < ViewComponent::Base
      def initialize(frame:)
        @frame = frame
      end
    end
  end
end
