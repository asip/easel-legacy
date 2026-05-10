# frozen_string_literal: true

# lightbox
module Lightbox
  # GLightbox
  module GLightbox
    # Component class
    class Component < ViewComponent::Base
      def initialize(img_url:, link_url: nil, small: false)
        @img_url = img_url
        @link_url = link_url
        @small = small
      end
    end
  end
end
