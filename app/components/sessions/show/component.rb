# frozen_string_literal: true

# Sessions::Show::Component class
class Sessions::Show::Component < ViewComponent::Base
  def initialize(user:)
    @user = user
  end
end
