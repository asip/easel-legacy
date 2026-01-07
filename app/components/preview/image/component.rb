# frozen_string_literal: true

# Preview
module Preview
  # Image
  module Image
    # Component class
    class Component < ViewComponent::Base
      def initialize(model:)
        @model = model
      end
    end
  end
end
