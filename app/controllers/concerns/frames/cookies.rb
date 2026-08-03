# frozen_string_literal: true

# Frames::Cookies module
module Frames::Cookies
  extend ActiveSupport::Concern

  protected

  def criteria
    @criteria ||= ::Cookies::Criteria.from(cookies)
  end
end
