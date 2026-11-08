# frozen_string_literal: true

# Users::Authentication::Skip module
module Users::Authentication::Skip
  extend ActiveSupport::Concern

  SKIP_ACTION_LIST_FOR_AUTH = [ :index, :show, :followees, :followers ]

  included do
    skip_before_action :authenticate_user!, only: SKIP_ACTION_LIST_FOR_AUTH
  end
end
