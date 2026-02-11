# frozen_string_literal: true

# account api controller
class Front::Api::V1::AccountController < Front::Api::V1::ApiController
  def show
    response.set_header("Authorization", "Bearer #{current_user.token}")
    render json: AccountResource.new(current_user).serializable_hash
  end
end
