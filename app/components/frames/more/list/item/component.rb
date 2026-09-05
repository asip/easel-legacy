# frozen_string_literal: true

# Frames::More::List::Item::Component class
class Frames::More::List::Item::Component < ViewComponent::Base
  def initialize(frame:, tag: true, query_map: {})
    @frame = frame
    @tag = tag
    @query_map = query_map
  end
end
