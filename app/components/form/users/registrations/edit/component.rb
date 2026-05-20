# frozen_string_literal: true

# Form::Users::Registrations::Edit::Component class
class Form::Users::Registrations::Edit::Component < ViewComponent::Base
  def initialize(resource:, resource_name:)
    @resource = resource
    @resource_name = resource_name
  end
end
