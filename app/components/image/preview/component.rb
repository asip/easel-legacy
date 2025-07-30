# frozen_string_literal: true

# image
module Image
  # preview
  module Preview
    # Component
    class Component < ViewComponent::Base
      def initialize(model:)
        @model = model
      end
    end
  end
end
