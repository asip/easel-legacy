# frozen_string_literal: true

# Frames::More::List::Item::Component class
class Frames::More::List::Item::Component < ViewComponent::Base
  def initialize(frame:, tag: true, from:, pagy:)
    @frame = frame
    @tag = tag
    @from = from
    @pagy = pagy
  end
end
