# frozen_string_literal: true

# Users::Show::Component class
class Users::Show::Component < ViewComponent::Base
  def initialize(user:)
    @user = user
  end
end
