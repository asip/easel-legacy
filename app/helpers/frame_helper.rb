# frozen_string_literal: true

# Frame Helper
module FrameHelper
  def query_map_hidden_field_tags
    tags = query_map.map do |key, value|
      hidden_field_tag(key, value) if value.present?
    end
    # rubocop:disable Rails/OutputSafety
    tags.join.html_safe
    # rubocop:enable Rails/OutputSafety
  end

  def tag_paths(frame)
    tags = frame.plain_tags
    tag_map = {}
    tags.each do |tag|
      tag_map[tag] = root_path({ q: { tag_name: tag }.to_json })
    end
    tag_map
  end
end
