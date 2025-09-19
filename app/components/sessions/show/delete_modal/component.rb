# frozen_string_literal: true

# sessions
module Sessions
  # show
  module Show
    # delete modal
    module DeleteModal
      # Component
      class Component < ViewComponent::Base
        def initialize(path:)
          @path = path
        end
      end
    end
  end
end
