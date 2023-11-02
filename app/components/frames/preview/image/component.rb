# frozen_string_literal: true

# frames
module Frames
  # preview
  module Preview
    # image
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
