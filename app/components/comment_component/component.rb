# frozen_string_literal: true

class CommentComponent::Component < ViewComponent::Base
  def initialize(frame:, token:, login:)
    @frame = frame
    @token = token
    @login = login
  end
end
