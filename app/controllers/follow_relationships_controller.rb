# frozen_string_literal: true

# Follow Relationships Controller
class FollowRelationshipsController < ApplicationController
  # follow (フォローするとき)
  def create
    current_user.follow(permitted_params[:user_id])
    redirect_to request.referer, status: :see_other
  end

  # unfollow (フォロー外すとき)
  def destroy
    current_user.unfollow(permitted_params[:user_id])
    redirect_to request.referer, status: :see_other
  end

  private

  def permitted_params
    params.permit(:user_id, :q, :ref).to_h
  end
end
