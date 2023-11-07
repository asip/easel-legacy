# frozen_string_literal: true

# Sessions Controller
class SessionsController < ApplicationController
  include Query::Search

  skip_before_action :require_login, except: [:destroy]

  def new
    @user = User.new
  end

  def create
    params_user = user_params
    @user = login(params_user[:email], params_user[:password])
    if @user
      create_successful
    else
      create_failed(user_params: params_user)
    end
  end

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

  def login(email, password)
    token = login_and_issue_token(email, password)
    user = current_user
    user.assign_token(token) if user && (user.token.blank? || user.token_expire?)
    user
  end

  def create_successful
    cookies.permanent[:access_token] = token
    redirect_to root_path
  end

  def create_failed(user_params:)
    success, @user = validate_login(user_params:)
    return if success

    flashes[:alert] = @user.full_error_messages_on_login
    render :new
  end

  def validate_login(user_params:)
    user = User.find_by(email: user_params[:email])
    if user
      user.validate_password_on_login(user_params)
    else
      user = User.new(user_params)
      user.validate_email_on_login(user_params)
    end
    success = user.errors.empty?
    [success, user]
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def query_params
    {}
  end
end
