class SessionsController < ApplicationController
  skip_before_action :require_login, except: [:destroy]

  def new
    @user = User.new
  end

  def create
    @user = login(params['user']['email'], params['user']['password'])
    if @user
      redirect_back_or_to root_path
    else
      @user = User.find_by(email: params['user']['email'])
      if @user
        @user.password = ''
      else
        @user = User.new(user_params)
      end

      render :new
    end
  end

  def destroy
    logout
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
