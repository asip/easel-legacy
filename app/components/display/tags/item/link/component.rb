# frozen_string_literal: true

# display
module Display
  # tags
  module Tags
    # item
    module Item
      # link
      module Link
        # Component class
        class Component < ViewComponent::Base
          def initialize(tag:, map:, list: false, link: true)
            @tag = tag
            @map = map
            @list = list
            @link = link
          end
        end
      end
    end
  end
end
