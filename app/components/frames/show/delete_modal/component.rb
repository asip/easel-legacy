# frozen_string_literal: true

# frames
module Frames
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
