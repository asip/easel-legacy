# frozen_string_literal: true

# frames
module Frames
  # edit
  module Edit
    # confirm
    module Confirm
      # Component class
      class Component < ViewComponent::Base
        def initialize(frame:, form:)
          @frame = frame
          @form = form
          @tag_map = Frames::PageTransition::TagMap.build(frame:)
        end
      end
    end
  end
end
