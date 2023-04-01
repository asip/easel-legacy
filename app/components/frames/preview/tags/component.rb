# frozen_string_literal: true

module Frames
  # Preview
  module Preview
    # Tags
    module Tags
      # Component
      class Component < ViewComponent::Base
        def initialize(tag_paths:)
          super
          @tag_paths = tag_paths
        end
      end
    end
  end
end
