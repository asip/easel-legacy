# frozen_string_literal: true

# frames
module Frames
  # new
  module New
    # confirm
    module Confirm
      # Component
      class Component < ViewComponent::Base
        def initialize(frame:, form:, tag_map:)
          @frame = frame
          @form = form
          @tag_map = tag_map
        end
      end
    end
  end
end
