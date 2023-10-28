# frozen_string_literal: true

# Follow Relationships Controller
class FollowRelationshipsController < ApplicationController
  # follow (フォローするとき)
  def create
    current_user.follow(params[:user_id])
    redirect_to request.referer, status: :see_other
  end

  # unfollow (フォロー外すとき)
  def destroy
    current_user.unfollow(params[:user_id])
    redirect_to request.referer, status: :see_other
  end

  # followees list (フォロイー一覧)
  def followees
    user = User.find(params[:user_id])
    @users = user.followees
  end

  # followers list (フォロワー一覧)
  def followers
    user = User.find(params[:user_id])
    @users = user.followers
  end
end
