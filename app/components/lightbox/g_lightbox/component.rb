# frozen_string_literal: true

# Lightbox::GLightbox::Component class
class Lightbox::GLightbox::Component < ViewComponent::Base
  def initialize(img_url:, link_url: nil, small: false)
    @img_url = img_url
    @link_url = link_url
    @small = small
  end
end
