class SessionsController < ApplicationController
  skip_before_action :require_login, except: [:destroy]

  def new
    @user = User.new
  end

  def create
    @user = login(params['user']['email'], params['user']['password'])
    if @user
      @user.regenerate_token
      redirect_to root_path
    else
      @user = User.find_by(email: params['user']['email'])
      if @user
        @user.password = params['user']['password']
        if @user.valid?(:login)
          @user.errors.add(:password, 'が間違っています')
        end
      else
        @user = User.new(user_params)
        if @user.valid?(:login)
          @user.errors.add(:email, 'が間違っています')
        end
      end

      render :new
    end
  end

  def show
    @user = current_user
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
