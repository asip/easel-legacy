# frozen_string_literal: true

# Comments Component
module Comments
  # Component
  class Component < ViewComponent::Base
    def initialize(frame:, token:, login:)
      super
      @frame = frame
      @token = token
      @login = login
    end
  end
end
