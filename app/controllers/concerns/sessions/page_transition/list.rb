# frozen_string_literal: true

# Sessions::PageTransition::List module
module Sessions::PageTransition::List
  extend ActiveSupport::Concern
  include PageTransition::Query::List

  protected

  def ref_items_for_frame
    @ref_items_for_frame ||= { from: "profile" }
  end
end
