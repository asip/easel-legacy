# frozen_string_literal: true

# frames
module Frames
  # preview
  module Preview
    # tags
    module Tags
      # Component
      class Component < ViewComponent::Base
        def initialize(tag_paths:, list: false)
          super
          @tag_paths = tag_paths
          @list = list
        end
      end
    end
  end
end
