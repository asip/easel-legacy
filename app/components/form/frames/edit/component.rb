# frozen_string_literal: true

# form
module Form
  # frames
  module Frames
    # edit
    module Edit
      # Component
      class Component < ViewComponent::Base
        def initialize(frame:)
          @frame = frame
        end
      end
    end
  end
end
