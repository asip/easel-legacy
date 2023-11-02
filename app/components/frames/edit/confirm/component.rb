# frozen_string_literal: true

# frames
module Frames
  # edit
  module Edit
    # confirm
    module Confirm
      # Component
      class Component < ViewComponent::Base
        def initialize(frame:, form:, tag_paths:)
          super
          @frame = frame
          @form = form
          @tag_paths = tag_paths
        end
      end
    end
  end
end
