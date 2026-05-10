# frozen_string_literal: true

# Preview
module Preview
  # Image
  module Image
    # Component class
    class Component < ViewComponent::Base
      def initialize(url:)
        @url = url
      end
    end
  end
end
