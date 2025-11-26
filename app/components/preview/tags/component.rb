# frozen_string_literal: true

# preview
module Preview
  # tags
  module Tags
    # Component
    class Component < ViewComponent::Base
      def initialize(tag_map:, list: false, link: true)
        @tag_map = tag_map
        @list = list
        @link = link
      end
    end
  end
end
