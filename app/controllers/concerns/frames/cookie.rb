# frozen_string_literal: true

# Frames::Cookie module
module Frames::Cookie
  extend ActiveSupport::Concern

  protected

  def criteria
    criteria = cookies[:q]
    criteria.present? ? criteria : "{}"
  end
end
