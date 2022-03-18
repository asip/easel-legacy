class UsersController < ApplicationController
  skip_before_action :require_login
  before_action :set_user, only: [:new, :create, :edit, :update]
  before_action :back_to_form, only: [:create, :update]

  def new
  end

  def edit
  end

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
    @user = if action_name == "new"
      User.new
    elsif action_name == "create"
      User.new(user_params)
    else
      current_user
    end
  end

  def back_to_form
    if params[:commit] == "戻る"
      @user.confirming = ""
      @user.attributes = user_params
      @user.image_derivatives! if @user.image.present?
      if action_name == "create"
        render :new
      elsif action_name == "update"
        render :edit
      end
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
