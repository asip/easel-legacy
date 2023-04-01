# frozen_string_literal: true

# Image
module Image
  # Preview
  module Preview
    # Component
    class Component < ViewComponent::Base
      def initialize(model:)
        super
        @model = model
      end
    end
  end
end
