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
end
