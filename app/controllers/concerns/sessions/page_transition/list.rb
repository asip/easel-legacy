# frozen_string_literal: true

# Sessions::PageTransition::List module
module Sessions::PageTransition::List
  extend ActiveSupport::Concern
  include PageTransition::Query::List

  protected

  def ref_items
    @ref_items ||= { from: "profile" }
  end
end
