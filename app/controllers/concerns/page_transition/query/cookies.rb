# frozen_string_literal: true

# PageTransition::Query::Cookies module
module PageTransition::Query::Cookies
  extend ActiveSupport::Concern

  protected

  def cookie_query_map
    @cookie_query_map ||= PageTransition::Cookies::QueryMap.from(cookies)
  end
end
