# frozen_string_literal: true

# comments
module Comments
  # Component
  class Component < ViewComponent::Base
    def initialize(frame:, q:, page:)
      @frame = frame
      @q = q
      @page = page
    end
  end
end
