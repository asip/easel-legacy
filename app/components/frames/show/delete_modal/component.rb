# frozen_string_literal: true

# Frames
module Frames
  # Preview
  module Show
    # DeleteModal
    module DeleteModal
      # Component
      class Component < ViewComponent::Base
        def initialize(path:)
          super
          @path = path
        end
      end
    end
  end
end
