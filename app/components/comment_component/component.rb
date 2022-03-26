# frozen_string_literal: true

# Comment Component
module CommentComponent
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
