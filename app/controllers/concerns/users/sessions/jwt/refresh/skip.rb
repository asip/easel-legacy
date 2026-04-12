# frozen_string_literal: true

# Users::Sessions::Jwt::Refresh::Skip module
module Users::Sessions::Jwt::Refresh::Skip
  extend ActiveSupport::Concern

  included do
    skip_before_action :refresh_token
  end
end
