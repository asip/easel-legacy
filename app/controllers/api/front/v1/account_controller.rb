# frozen_string_literal: true

# api
module Api
  # front
  module Front
    # v1
    module V1
      # Account Controller
      class AccountController < Api::Front::V1::ApiController
        def show
          response.set_header("Authorization", "Bearer #{current_user.token}")
          render json: AccountResource.new(current_user).serializable_hash
        end
      end
    end
  end
end
