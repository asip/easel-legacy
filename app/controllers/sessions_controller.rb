class SessionsController < ApplicationController
  skip_before_action :require_login, except: [:destroy]

  def new
    @user = User.new
  end

  def create
    params_user = user_params
    @user = login(params_user[:email], params_user[:password])
    if @user
      @user.regenerate_token if @user.token.blank?
      redirect_to root_path
    else
      @user = User.find_by(email: params_user[:email])
      if @user
        @user.password = params_user[:password]
        if @user.valid?(:login)
          @user.errors.add(:password, "が間違っています")
        end
      else
        @user = User.new(params_user)
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

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
