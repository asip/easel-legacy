# frozen_string_literal: true

# account api controller
class Api::Front::V1::AccountController < Api::Front::V1::ApiController
  def show
    response.set_header("Authorization", "Bearer #{current_user.token}")
    render json: AccountResource.new(current_user).serializable_hash
  end
end
