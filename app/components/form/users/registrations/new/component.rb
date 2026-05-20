# frozen_string_literal: true

# Form::Users::Registrations::New::Component class
class Form::Users::Registrations::New::Component < ViewComponent::Base
  def initialize(resource:, resource_name:)
    @resource = resource
    @resource_name = resource_name
  end
end
