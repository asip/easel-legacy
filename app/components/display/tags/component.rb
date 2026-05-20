# frozen_string_literal: true

# Display::Tags::Component class
class Display::Tags::Component < ViewComponent::Base
  def initialize(tag_map:, list: false, link: true)
    @tag_map = tag_map
    @list = list
    @link = link
  end
end
