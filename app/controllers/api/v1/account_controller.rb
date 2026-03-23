# frozen_string_literal: true

# account api controller
class Api::V1::AccountController < Api::V1::ApiController
  def show
    # response.set_header("Authorization", "Bearer #{current_user.token}")
    render_account(account: current_user)
  end
end
