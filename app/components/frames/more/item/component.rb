# frozen_string_literal: true

# frames
module Frames
  # more
  module More
    # Item
    module Item
      # Component class
      class Component < ViewComponent::Base
        def initialize(frame:, tag: true, from:, pagy:)
          @frame = frame
          @tag = tag
          @from = from
          @pagy = pagy
        end
      end
    end
  end
end
