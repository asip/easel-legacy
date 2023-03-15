# frozen_string_literal: true

# Frames
module Frames
  # Preview
  module Preview
    # Image
    module Image
      # Component
      class Component < ViewComponent::Base
        def initialize(frame:, original:, spotlight:)
          super
          @frame = frame
          @original = original
          @spotlight = spotlight
        end
      end
    end
  end
end
