# frozen_string_literal: true

# Users Controller
class UsersController < ApplicationController
  include Query::Search
  include Ref::User

  skip_before_action :require_login

  before_action :set_user, only: %i[create update]
  before_action :back_to_form, only: %i[create update]

  def show
    @user = Queries::Users::FindUser.run(user_id: params[:id])
  end

  # followees list (フォロイー一覧)
  def followees
    @users = Queries::Users::ListFollowees.run(user_id: path_params[:user_id])
  end

  # followers list (フォロワー一覧)
  def followers
    @users = Queries::Users::ListFollowers.run(user_id: path_params[:user_id])
  end

  def new
    @user = User.new
  end

  def edit
    @user = current_user
  end

  def create
    mutation = Mutations::Users::SaveUser.run(user: @user)
    @user = mutation.user
    if mutation.success?
      redirect_to login_path
    else
      flashes[:alert] = @user.full_error_messages unless @user.errors.empty?
      render :new, status: :unprocessable_entity
    end
  end

  def update
    mutation = Mutations::Users::SaveUserWithToken.run(user: @user)
    @user = mutation.user
    if mutation.success?
      cookies.permanent[:access_token] = { value: @user.token } if @user.saved_change_to_email?
      redirect_to profile_path
    else
      flashes[:alert] = @user.full_error_messages unless @user.errors.empty?
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_user
    case action_name
    when "create"
      @user = User.new(form_params)
    when "update"
      @user = current_user
      @user.attributes = form_params
    end
  end

  def back_to_form
    return unless params[:commit] == "戻る"

    @user.confirming = ""
    @user.image_derivatives! if @user.image.present?
    case action_name
    when "create"
      render :new
    when "update"
      render :edit
    end
  end

  def form_params
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
