# frozen_string_literal: true

# Form::Sessions::New::Component class
class Form::Sessions::New::Component < ViewComponent::Base
  def initialize(resource:, resource_name:)
    @resource = resource
    @resource_name = resource_name
  end
end
