# frozen_string_literal: true

# Form::Account::Passwords::Edit::Input::Component class
class Form::Account::Passwords::Edit::Input::Component < ViewComponent::Base
  def initialize(user:, form:, back_to_path:)
    @user = user
    @form = form
    @back_to_path = back_to_path
  end
end
