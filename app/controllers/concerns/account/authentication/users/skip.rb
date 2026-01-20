# frozen_string_literal: true

# account/authentication/users/Skip module
module Account::Authentication::Users::Skip
  extend ActiveSupport::Concern

  included do
    skip_before_action :authenticate_user!, only: [ :index, :show, :followees, :followers ]
  end
end
