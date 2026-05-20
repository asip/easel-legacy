# frozen_string_literal: true

# Form::Users::Registrations::Edit::Confirm::Component class
class Form::Users::Registrations::Edit::Confirm::Component < ViewComponent::Base
  def initialize(user:, form:)
    @user = user
    @form = form
  end
end
