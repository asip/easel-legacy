# frozen_string_literal: true

# Follower Relationships Controller
class FollowerRelationshipsController < ApplicationController
  include FollowerRelationships::Variables

  # follow (フォローするとき)
  def create
    current_user.follow(user_id)
    reload
  end

  # unfollow (フォロー外すとき)
  def destroy
    current_user.unfollow(user_id)
    reload
  end
end
