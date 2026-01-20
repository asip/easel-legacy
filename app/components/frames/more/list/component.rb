# frozen_string_literal: true

# frames
module Frames
  # more
  module More
    # list
    module List
      # Component class
      class Component < ViewComponent::Base
        def initialize(frames:, tag: true, from:, pagy:)
          @frames = frames
          @tag = tag
          @from = from
          @pagy = pagy
        end
      end
    end
  end
end
