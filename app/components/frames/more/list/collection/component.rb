# frozen_string_literal: true

# Frames::More::List::Collection::Component class
class Frames::More::List::Collection::Component < ViewComponent::Base
  with_collection_parameter :frame

  def initialize(frame:, tag: true, from:, pagy:)
    @frame = frame
    @tag = tag
    @from = from
    @pagy = pagy
  end
end
