# frozen_string_literal: true

# Frame Helper
module FrameHelper
  def query_params_hidden_field_tags
    tags = query_params.map do |key, value|
      hidden_field_tag(key, value) if value.present?
    end
    # rubocop:disable Rails/OutputSafety
    tags.join.html_safe
    # rubocop:enable Rails/OutputSafety
  end

  def tag_paths(frame)
    tags = frame.tags_preview
    tag_map = {}
    tags.each do |tag|
      tag_map[tag] = frames_path({ q: tag })
    end
    tag_map
  end
end
