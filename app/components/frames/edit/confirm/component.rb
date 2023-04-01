# frozen_string_literal: true

# Frames
module Frames
  # Edit
  module Edit
    # Confirm
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
