# frozen_string_literal: true

# account api controller
class Front::Api::V1::AccountController < Front::Api::V1::ApiController
  def show
    response.set_header("Authorization", "Bearer #{current_user.token}")
    render_account(account: current_user)
  end
end
