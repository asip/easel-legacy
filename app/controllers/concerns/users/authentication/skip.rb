# frozen_string_literal: true

# Users::Authentication::Skip module
module Users::Authentication::Skip
  extend ActiveSupport::Concern

  included do
    skip_before_action :authenticate_user!, only: [ :index, :show, :followees, :followers ]
  end
end
