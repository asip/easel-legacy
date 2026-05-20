# frozen_string_literal: true

# Modal::Frames::Delete::Component class
class Modal::Frames::Delete::Component < ViewComponent::Base
  def initialize(path:)
    @path = path
  end
end
