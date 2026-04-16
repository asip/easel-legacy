# frozen_string_literal: true

# Frames::Cookies module
module Frames::Cookies
  extend ActiveSupport::Concern

  protected

  def criteria
    criteria = cookies[:q]
    criteria.present? ? criteria : "{}"
  end
end
