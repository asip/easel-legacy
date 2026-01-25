# frozen_string_literal: true

# Users::PageTransition::List module
module Users::PageTransition::List
  extend ActiveSupport::Concern
  include PageTransition::Query::List

  protected

  def ref_items_for_frame
    @ref_items_for_frame ||= { from: "user_profile" }
  end
end
