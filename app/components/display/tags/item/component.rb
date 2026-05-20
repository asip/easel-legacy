# frozen_string_literal: true

# Display::Tags::Item::Component class
class Display::Tags::Item::Component < ViewComponent::Base
  def initialize(tag:, list: false, link: true)
    @tag = tag
    @list = list
    @link = link
  end
end
