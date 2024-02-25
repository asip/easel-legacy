# frozen_string_literal: true

# Sessions Controller
class SessionsController < ApplicationController
  include Query::Search

  skip_before_action :require_login, except: [ :destroy ]
  before_action :authenticated, only: [ :new ]

  def new
    @user = User.new
  end

  def create
    params_form = form_params
    @user = login(params_form[:email], params_form[:password])
    if @user
      create_successful(user: @user)
    else
      create_failed(form_params: params_form)
    end
  end

  def show
    @user = current_user
  end

  def destroy
    current_user.reset_token
    cookies.delete(:access_token)
    logout
    redirect_to login_path, status: :see_other
  end

  private

  def authenticated
    redirect_to root_path if logged_in?
  end

  def login(email, password)
    token = login_and_issue_token(email, password)
    user = current_user
    user.assign_token(token) if user && (user.token.blank? || user.token_expire?)
    user
  end

  def create_successful(user:)
    cookies.permanent[:access_token] = { value: user.token }
    redirect_to root_path
  end

  def create_failed(form_params:)
    success, @user = User.validate_login(form_params:)
    return if success

    flashes[:alert] = @user.full_error_messages_on_login
    render layout: false, content_type: "text/vnd.turbo-stream.html"
  end

  def form_params
    params.require(:user).permit(:email, :password)
  end

  def query_params
    {}
  end
end
