# frozen_string_literal: true

# Display::Tags::Item::Link::Component class
class Display::Tags::Item::Link::Component < ViewComponent::Base
  def initialize(tag:, map:, list: false, link: true)
    @tag = tag
    @map = map
    @list = list
    @link = link
  end
end
