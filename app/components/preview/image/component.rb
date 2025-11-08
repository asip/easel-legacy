# frozen_string_literal: true

# preview
module Preview
  # image
  module Image
    # Component
    class Component < ViewComponent::Base
      def initialize(model:, original:, photoswipe: false, session: false)
        @model = model
        @original = original
        @photoswipe = photoswipe
        @session = session
      end
    end
  end
end
