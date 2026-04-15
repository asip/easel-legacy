# frozen_string_literal: true

# Follower Relationships Controller
class FollowerRelationshipsController < ApplicationController
  include FollowerRelationships::Variables

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
end
