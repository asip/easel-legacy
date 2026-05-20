# frozen_string_literal: true

# Frames::More::List::Component class
class Frames::More::List::Component < ViewComponent::Base
  def initialize(frames:, tag: true, from:, pagy:)
    @frames = frames
    @tag = tag
    @from = from
    @pagy = pagy
  end
end
