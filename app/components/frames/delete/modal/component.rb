# frozen_string_literal: true

# frames
module Frames
  # Delete
  module Delete
    # modal
    module Modal
      # Component
      class Component < ViewComponent::Base
        def initialize(path:)
          @path = path
        end
      end
    end
  end
end
