# frozen_string_literal: true

# PageTransition::Query::Cookies module
module PageTransition::Query::Cookies
  extend ActiveSupport::Concern

  protected

  def cookie_query_map
    @query_map ||= PageTransition::Cookies::QueryMap.build(cookies)
  end
end
