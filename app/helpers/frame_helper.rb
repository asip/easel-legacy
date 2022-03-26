# frozen_string_literal: true

# Frame Helper
module FrameHelper
  def query_params_hidden_field_tags
    tags = query_params.map do |key, value|
      hidden_field_tag(key, value) if value.present?
    end
    tags.join.html_safe
  end
end
