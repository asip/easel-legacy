# frozen_string_literal: true

# Api
module Api
  # Front
  module Front
    # V1
    module V1
      # Sessions Controller
      class SessionsController < Api::Front::V1::ApiController
        skip_before_action :authenticate, only: [:create]
        # skip_before_action :require_login, except: [:destroy]

        def show
          @user = current_user

          render json: AccountSerializer.new(@user).serializable_hash
        end

        def create
          params_user = user_params
          token = login_and_issue_token(params_user[:email], params_user[:password])
          @user = current_user

          if @user
            @user.assign_token(token) if @user.token.blank? || @user.token_expire?
            cookies.permanent[:access_token] = token

            render json: AccountSerializer.new(@user).serializable_hash
          else
            validate_login(params_user)
          end
        end

        def destroy
          current_user.reset_token if current_user
          cookies.delete(:access_token)
          user_id = current_user.id
          logout
          user = User.find_by(id: user_id)
          render json: AccountSerializer.new(user).serializable_hash
        end

        def user_params
          params.require(:user).permit(:email, :password)
        end

        private

        def validate_login(params_user)
          @user = User.find_by(email: params_user[:email])
          if @user
            message = 'パスワードが間違っています'
          else
            message = 'メールアドレスが間違っています'
          end

          render json: {
            message: message
          }
        end
      end
    end
  end
end