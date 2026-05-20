# frozen_string_literal: true

# Form::Users::Registrations::Edit::Input::Component class
class Form::Users::Registrations::Edit::Input::Component < ViewComponent::Base
  def initialize(user:, form:, back_to_path:)
    @user = user
    @form = form
    @back_to_path = back_to_path
  end
end
