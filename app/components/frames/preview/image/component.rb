# frozen_string_literal: true

# Frames
module Frames
  # Preview
  module Preview
    # Image
    module Image
      # Component
      class Component < ViewComponent::Base
        def initialize(frame:, original:, photoswipe:)
          super
          @frame = frame
          @original = original
          @photoswipe = photoswipe
        end
      end
    end
  end
end
