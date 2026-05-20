# frozen_string_literal: true

# Preview::Image::Component class
class Preview::Image::Component < ViewComponent::Base
  def initialize(url:)
    @url = url
  end
end
