# frozen_string_literal: true

# form
module Form
  # frames
  module Frames
    # new
    module New
      # confirm
      module Confirm
        # Component class
        class Component < ViewComponent::Base
          def initialize(frame:, form:)
            @frame = frame
            @form = form
            @tag_map = Frame.tag_map(frame: @frame)
          end
        end
      end
    end
  end
end
