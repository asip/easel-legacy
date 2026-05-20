# frozen_string_literal: true

# Lightbox::PhotoSwipe::Component class
class Lightbox::PhotoSwipe::Component < ViewComponent::Base
  def initialize(img_url:, link_url: nil)
    @img_url = img_url
    @link_url = link_url
  end
end
