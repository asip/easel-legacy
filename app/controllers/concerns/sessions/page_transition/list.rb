# frozen_string_literal: true

# Sessions::PageTransition::List module
module Sessions::PageTransition::List
  extend ActiveSupport::Concern
  include PageTransition::Query::List
end
