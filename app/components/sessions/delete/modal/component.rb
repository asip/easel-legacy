# frozen_string_literal: true

# sessions
module Sessions
  # delete
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
