# frozen_string_literal: true

# display
module Display
  # image
  module Image
    # Component class
    class Component < ViewComponent::Base
      def initialize(model:, original: false, photoswipe: false, small: false)
        @photoswipe = photoswipe
        @small = small

        @img_url, @link_url = set_urls(model:, original:)
      end

      def set_urls(model:, original:)
        if model.class == Frame && model.file.present?
          img_url = model.file_proxy_url(:three)
          link_url = original ? model.file_proxy_url(:original) : nil
        elsif model.class == User && model.image.present?
          img_url = model.image_url_for_view(:three)
          link_url = original ? model.image_url_for_view(:original) : nil
        end

        return [img_url, link_url]
      end
    end
  end
end
