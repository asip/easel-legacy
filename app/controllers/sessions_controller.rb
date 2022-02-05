class SessionsController < ApplicationController
  skip_before_action :require_login, except: [:destroy]

  def new
    @user = User.new
  end

  def create
    user_params = params_user
    @user = login(user_params[:email], user_params[:password])
    if @user
      @user.regenerate_token
      redirect_to root_path
    else
      @user = User.find_by(email: user_params[:email])
      if @user
        @user.password = user_params[:password]
        if @user.valid?(:login)
          @user.errors.add(:password, "が間違っています")
        end
      else
        @user = User.new(user_params)
        if @user.valid?(:login)
          @user.errors.add(:email, "が間違っています")
        end
      end

      render :new
    end
  end

  def show
    @user = current_user
  end

  def destroy
    current_user.reset_token
    logout
    redirect_to root_path
  end

  private

  def params_user
    params.require(:user).permit(:email, :password)
  end
end
