# frozen_string_literal: true

# Users Controller
class UsersController < ApplicationController
  skip_before_action :require_login
  before_action :set_user, only: %i[new create edit update]
  before_action :back_to_form, only: %i[create update]

  def new; end

  def edit; end

  def create
    @user.image_derivatives! if @user.image.present?
    if @user.save
      redirect_to login_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    @user.attributes = user_params
    @user.image_derivatives! if @user.image.present?
    if @user.save
      redirect_to profile_path
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = case action_name
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
end
