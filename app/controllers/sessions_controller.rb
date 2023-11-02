# frozen_string_literal: true

# Sessions Controller
class SessionsController < ApplicationController
  include Query::Search

  skip_before_action :require_login, except: [:destroy]

  def new
    @user = User.new
  end

  # rubocop:disable Metrics/MethodLength
  def create
    params_user = user_params
    token = login_and_issue_token(params_user[:email], params_user[:password])
    @user = current_user
    if @user
      @user.assign_token(token) if @user.token.blank? || @user.token_expire?
      cookies.permanent[:access_token] = token
      redirect_to root_path
    else
      validate_login(params_user)
      render :new
    end
  end
  # rubocop:enable Metrics/MethodLength

  def show
    @user = current_user
  end

  def destroy
    current_user.reset_token
    cookies.delete(:access_token)
    logout
    redirect_to root_path, status: :see_other
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def validate_login(params_user)
    @user = User.find_by(email: params_user[:email])
    if @user
      validate_password(params_user)
    else
      validate_email(params_user)
    end
  end

  def validate_password(params_user)
    @user.password = params_user[:password]
    @user.valid?(:login)
    @user.errors.add(:password, t('action.login.invalid')) if params_user[:password].present?
  end

  def validate_email(params_user)
    @user = User.new(params_user)
    @user.valid?(:login)
    @user.errors.add(:email, t('action.login.invalid')) if @user.email.present?
  end

  def query_params
    {}
  end
end
