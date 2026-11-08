# frozen_string_literal: true

# PageTransition::Query::Cookies module
module PageTransition::Query::Cookies
  extend ActiveSupport::Concern

  included do
    helper_method :cookie_query_map
  end

  protected

  def cookie_query_map
    @cookie_query_map ||= ::Cookies::QueryMap.from(cookies)
  end
end
