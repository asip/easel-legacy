# frozen_string_literal: true

# lightbox
module Lightbox
  # PhotoSwipe
  module PhotoSwipe
    # Component class
    class Component < ViewComponent::Base
      def initialize(img_url:, link_url: nil)
        @img_url = img_url
        @link_url = link_url
      end
    end
  end
end
