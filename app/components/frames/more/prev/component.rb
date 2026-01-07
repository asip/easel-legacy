# frozen_string_literal: true

# frames
module Frames
  # more
  module More
    # prev
    module Prev
      # Component class
      class Component < ViewComponent::Base
        def initialize(pagy:)
          @pagy = pagy
        end
      end
    end
  end
end
