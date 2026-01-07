# frozen_string_literal: true

# display
module Display
  # image
  module Image
    # Component class
    class Component < ViewComponent::Base
      def initialize(model:, original: false, photoswipe: false, small: false)
        @model = model
        @original = original
        @photoswipe = photoswipe
        @small = small
      end
    end
  end
end
