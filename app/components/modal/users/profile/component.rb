# frozen_string_literal: true

# Modal::Users::Profile::Component class
class Modal::Users::Profile::Component < ViewComponent::Base
  def initialize(user:)
    @user = user
  end
end
