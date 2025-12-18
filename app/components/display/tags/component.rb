# frozen_string_literal: true

# display
module Display
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
