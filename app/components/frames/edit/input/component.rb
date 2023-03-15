# frozen_string_literal: true

# Frames
module Frames
  # Edit
  module Edit
    # Confirm
    module Input
      # Component
      class Component < ViewComponent::Base
        def initialize(frame:, form:, back_to_path:)
          super
          @frame = frame
          @form = form
          @back_to_path = back_to_path
        end
      end
    end
  end
end
