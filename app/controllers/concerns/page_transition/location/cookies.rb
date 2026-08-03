# frozen_string_literal: true

# PageTransition::Location::Cookies module
module PageTransition::Location::Cookies
  extend ActiveSupport::Concern

  included do
    helper_method :location
  end

  protected

  def location
    @location ||= ::Cookies::Location.from(request, cookies)
  end
end
