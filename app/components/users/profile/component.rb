# frozen_string_literal: true

# Users::Profile::Component class
class Users::Profile::Component < ViewComponent::Base
  def initialize(user:)
    @user = user
  end
end
