# frozen_string_literal: true

# Users::Sessions::Location::Store module
module Users::Sessions::Location::Store
  extend ActiveSupport::Concern

  included do
    before_action :store_location, only: [ :new ]
  end

  protected

  def store_location
    from = request.referer
    self.prev_url = from || root_path if PageTransition::Path.not_unsaved_paths_before_login?(from)
  end
end
