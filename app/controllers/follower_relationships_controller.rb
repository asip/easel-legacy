# frozen_string_literal: true

# Follower Relationships Controller
class FollowerRelationshipsController < ApplicationController
  # follow (フォローするとき)
  def create
    current_user.follow(user_id)
    redirect_to request.referer, status: :see_other
  end

  # unfollow (フォロー外すとき)
  def destroy
    current_user.unfollow(user_id)
    redirect_to request.referer, status: :see_other
  end

  private

  def route_params
    @route_params ||= params.permit(:user_id).to_h
  end

  def user_id
    route_params[:user_id]
  end
end
