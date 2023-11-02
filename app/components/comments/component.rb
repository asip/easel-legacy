# frozen_string_literal: true

# comments
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
