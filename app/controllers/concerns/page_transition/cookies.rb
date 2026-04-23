# frozen_string_literal: true

# PageTransition::Cookies module
module PageTransition::Cookies
  extend ActiveSupport::Concern
  include PageTransition::Location::Cookies
  include PageTransition::Query::Cookies
end
