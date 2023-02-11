# frozen_string_literal: true

# OAuths Controller
class OauthsController < ApplicationController
  skip_before_action :require_login # applications_controllerでbefore_action :require_loginを設定している場合

  def oauth
    login_at(auth_params[:provider])
  end

  # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
  def callback
    provider = auth_params[:provider]
    if (@user = login_from(provider))
      @user.assign_token(user_class.issue_token(id: @user.id, email: @user.email))
      cookies.permanent[:access_token] = @user.token
      redirect_to root_path
    else
      begin
        @user = create_from(provider)
        reset_session
        @user.assign_token(user_class.issue_token(id: @user.id, email: @user.email))
        auto_login(@user)
        cookies.permanent[:access_token] = @user.token
        redirect_to root_path
      rescue ActiveRecord::RecordNotUnique
        redirect_to root_path
      rescue StandardError
        redirect_to root_path
      end
    end
  end
  # rubocop:enable Metrics/AbcSize, Metrics/MethodLength

  private

  def auth_params
    params.permit(:code, :provider)
  end
end
