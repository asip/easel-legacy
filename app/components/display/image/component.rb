# frozen_string_literal: true

# Display::Image::Component class
class Display::Image::Component < ViewComponent::Base
  def initialize(model:, original: false, photoswipe: false, small: false)
    @photoswipe = photoswipe
    @small = small

    @img_url, @link_url = get_urls(model:, original:)
  end

  private

  def get_urls(model:, original:)
    model_class = model.class
    if model_class == Frame && model.file.present?
      img_url = model.file_proxy_url(:three)
      link_url = original ? model.file_proxy_url(:original) : nil
    elsif model_class == User
      img_url = model.image_url_for_view(:three)
      link_url = original ? model.image_url_for_view(:original) : nil
    end

    [ img_url, link_url ]
  end
end
