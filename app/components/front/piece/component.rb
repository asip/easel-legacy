# frozen_string_literal: true

# front
module Front
  # piece
  module Piece
    # Component
    class Component < ViewComponent::Base
      def initialize(path:, view_data: {})
        @path = path
        @view_data = view_data
      end
    end
  end
end
