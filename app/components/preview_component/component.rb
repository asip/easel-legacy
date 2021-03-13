# frozen_string_literal: true

class PreviewComponent::Component < ViewComponent::Base
  def initialize(model:)
    @model = model
  end
end