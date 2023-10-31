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
          render json: UserSerializer.new(current_user).serializable_hash
        end
      end
    end
  end
end
