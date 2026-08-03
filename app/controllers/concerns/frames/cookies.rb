# frozen_string_literal: true

# Frames::Cookies module
module Frames::Cookies
  extend ActiveSupport::Concern

  protected

  def criteria
    @criteria ||= Frames::Cookies::Criteria.build(cookies)
  end
end
