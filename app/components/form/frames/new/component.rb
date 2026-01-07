# frozen_string_literal: true

# form
module Form
  # frames
  module Frames
    # new
    module New
      # Component class
      class Component < ViewComponent::Base
        def initialize(frame:)
          @frame = frame
        end
      end
    end
  end
end
