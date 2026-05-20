# frozen_string_literal: true

# Form::Users::Registrations::New::Confirm::Component class
class Form::Users::Registrations::New::Confirm::Component < ViewComponent::Base
  def initialize(user:, form:)
    @user = user
    @form = form
  end
end
