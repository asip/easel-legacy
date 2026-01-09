# frozen_string_literal: true

# frames
module Frames
  # pager
  module Pager
    # Component class
    class Component < ViewComponent::Base
      def initialize(pagy:)
        @pagy = pagy
      end
    end
  end
end
