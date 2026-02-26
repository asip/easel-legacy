# frozen_string_literal: true

# modal
module Modal
  # frames
  module Frames
    # Delete
    module Delete
      # Component class
      class Component < ViewComponent::Base
        def initialize(path:)
          @path = path
        end
      end
    end
  end
end
