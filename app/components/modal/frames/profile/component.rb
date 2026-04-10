# frozen_string_literal: true

# modal
module Modal
  # frames
  module Frames
    # Profile
    module Profile
      # Component class
      class Component < ViewComponent::Base
        def initialize(frame:)
          @frame = frame
        end
      end
    end
  end
end
