# frozen_string_literal: true

# Users::Sessions::Location::Store module
module Users::Sessions::Location::Store
  extend ActiveSupport::Concern
  include PageLocation::Store

  included do
    before_action :store_location, only: [ :new ]
  end

  private

  def saved_page?
    PageTransition::Path.saved_paths_before_login?(from)
  end
end
