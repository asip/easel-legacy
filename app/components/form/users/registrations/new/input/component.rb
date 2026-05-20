# frozen_string_literal: true

# Form::Users::Registrations::New::Input::Component class
class Form::Users::Registrations::New::Input::Component < ViewComponent::Base
  def initialize(form:, user:, back_to_path:)
    @form = form
    @user = user
    @back_to_path = back_to_path
  end
end
