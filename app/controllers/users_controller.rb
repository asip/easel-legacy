class UsersController < ApplicationController
  skip_before_action :require_login
  before_action :set_user, only: [:new, :create]
  before_action :back_to_form, only: [:create]

  def new
  end

  def create
    if @user.save
      redirect_to login_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def set_user
    if action_name == "new"
      @user = User.new
    elsif action_name == "create"
      @user = User.new(user_params)
    end
  end

  def back_to_form
    if params[:commit] == "戻る"
      @user.confirming = ""
      render :new
      # return
    end
  end

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :password_confirmation,
      :confirming
    )
  end
end
