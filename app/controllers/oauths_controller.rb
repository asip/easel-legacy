# frozen_string_literal: true

# OAuths Controller
class OauthsController < ApplicationController
  protect_from_forgery except: :callback

  skip_before_action :require_login # applications_controllerでbefore_action :require_loginを設定している場合
  before_action :verify_g_csrf_token

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

  # rubocop:disable Metrics/MethodLength
  def sorcery_fetch_user_hash(provider_name)
    provider = sorcery_get_provider provider_name
    if @provider.nil? || @provider != provider
      @provider = provider
      @access_token = nil
      @user_hash = nil
    end

    @user_hash = {}
    @user_hash[:user_info] =
      Google::Auth::IDTokens.verify_oidc(auth_params[:credential],
                                         aud: Rails.application.credentials.dig(:google, :client_id))
    @user_hash[:uid] = @user_hash[:user_info]['sub']
    nil
  end
  # rubocop:enable Metrics/MethodLength

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
