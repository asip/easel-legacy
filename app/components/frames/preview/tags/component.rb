# frozen_string_literal: true

# frames
module Frames
  # preview
  module Preview
    # tags
    module Tags
      # Component
      class Component < ViewComponent::Base
        def initialize(tag_paths:, list: false, link: true)
          @tag_paths = tag_paths
          @list = list
          @link = link
        end
      end
    end
  end
end
