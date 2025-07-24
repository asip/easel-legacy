# frozen_string_literal: true

# Users Controller
class UsersController < ApplicationController
  include Query::Search
  include Ref::User

  skip_before_action :authenticate_user!

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

  private

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
