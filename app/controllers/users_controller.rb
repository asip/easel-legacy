# frozen_string_literal: true

# Users Controller
class UsersController < ApplicationController
  include Query::Search
  include Ref::User

  skip_before_action :require_login

  before_action :set_case
  before_action :set_user, only: %i[create update]
  before_action :back_to_form, only: %i[create update]

  def show
    @user = @case.detail_query(user_id: params[:id])
  end

  # followees list (フォロイー一覧)
  def followees
    @users = @case.followees_query(user_id: path_params[:user_id])
  end

  # followers list (フォロワー一覧)
  def followers
    @users = @case.followers_query(user_id: path_params[:user_id])
  end

  def new
    @user = User.new
  end

  def edit
    @user = current_user
  end

  def create
    success, @user = @case.save_user(user: @user)
    if success
      redirect_to login_path
    else
      flashes[:alert] = @user.full_error_messages unless @user.errors.empty?
      render :new, status: :unprocessable_entity
    end
  end

  def update
    success, @user = @case.save_user_with_token(user: @user)
    if success
      cookies.permanent[:access_token] = @user.token if @user.saved_change_to_email?
      redirect_to profile_path
    else
      flashes[:alert] = @user.full_error_messages unless @user.errors.empty?
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_case
    @case = UsersCase.new
  end

  def set_user
    case action_name
    when 'create'
      @user = User.new(user_params)
    when 'update'
      @user = current_user
      @user.attributes = user_params
    end
  end

  def back_to_form
    return unless params[:commit] == '戻る'

    @user.confirming = ''
    @user.image_derivatives! if @user.image.present?
    case action_name
    when 'create'
      render :new
    when 'update'
      render :edit
    end
  end

  def user_params
    params.require(:user).permit(
      :name, :email, :password, :password_confirmation, :image, :confirming
    )
  end

  def path_params
    params.permit(:user_id)
  end

  def query_params
    {}
  end

  def ref_params
    { ref: params[:ref], ref_id: params[:ref_id] }
  end
end
