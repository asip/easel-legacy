# frozen_string_literal: true

# frames
module Frames
  # more
  module More
    # list
    module List
      # Component class
      class Component < ViewComponent::Base
        def initialize(frames:, from:, pagy:)
          @frames = frames
          @from = from
          @pagy = pagy
        end
      end
    end
  end
end
