# frozen_string_literal: true

# Users Controller
class UsersController < ApplicationController
  include Query::Search
  include Ref::User

  skip_before_action :require_login
  before_action :set_user, only: %i[show new create edit update]
  before_action :back_to_form, only: %i[create update]

  def show; end

  # followees list (フォロイー一覧)
  def followees
    @users = User.find(path_params[:user_id]).followees
  end

  # followers list (フォロワー一覧)
  def followers
    @users = User.find(path_params[:user_id]).followers
  end

  def new; end

  def edit; end

  def create
    if @user.save(context: :with_validation)
      redirect_to login_path
    else
      flashes[:alert] = @user.errors.full_messages unless @user.errors.empty?
      render :new, status: :unprocessable_entity
    end
  end

  # rubocop:disable Metrics/AbcSize
  def update
    @user.attributes = user_params
    if @user.save(context: :with_validation)
      # puts @user.saved_change_to_email?
      @user.update_token
      cookies.permanent[:access_token] = @user.token if @user.saved_change_to_email?
      redirect_to profile_path
    else
      flashes[:alert] = @user.errors.full_messages unless @user.errors.empty?
      render :edit, status: :unprocessable_entity
    end
  end
  # rubocop:enable Metrics/AbcSize

  private

  def set_user
    @user = case action_name
            when 'show'
              User.find_by!(id: params[:id])
            when 'new'
              User.new
            when 'create'
              User.new(user_params)
            else
              current_user
            end
  end

  def back_to_form
    return unless params[:commit] == '戻る'

    @user.confirming = ''
    @user.attributes = user_params
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
      :name,
      :email,
      :password,
      :password_confirmation,
      :image,
      :confirming
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
