# frozen_string_literal: true

# OAuths Controller
class OauthsController < ApplicationController
  include Sorcery::Credential

  protect_from_forgery except: :callback

  skip_before_action :require_login # applications_controllerでbefore_action :require_loginを設定している場合
  before_action :verify_g_csrf_token

  def callback
    provider = auth_params[:provider]

    login_from_oauth(provider)
    cookies.permanent[:access_token] = @user.token
    redirect_to root_path
  end

  private

  # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
  def login_from_oauth(provider)
    if (@user = login_from(provider))
      @user.assign_token(user_class.issue_token(id: @user.id, email: @user.email))
    else
      @user = create_from(provider)
      reset_session
      @user.assign_token(user_class.issue_token(id: @user.id, email: @user.email))
      auto_login(@user)
    end
  rescue ActiveRecord::RecordNotUnique
    redirect_to root_path
  rescue StandardError
    redirect_to root_path
  end
  # rubocop:enable Metrics/AbcSize, Metrics/MethodLength

  def verify_g_csrf_token
    if cookies['g_csrf_token'].blank? || params[:g_csrf_token].blank? ||
       cookies['g_csrf_token'] != params[:g_csrf_token]
      redirect_to root_path, notice: '不正なアクセスです'
    end
  end

  def auth_params
    params.permit(:provider, :credential)
  end
end
