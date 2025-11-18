# frozen_string_literal: true

# Users Controller
class UsersController < ApplicationController
  include Query::Search
  include Query::List
  include Ref::UserRef
  include Queries::Users::Pagination

  skip_before_action :authenticate_user!

  def show
    user_id = permitted_params[:id]
    @user = Queries::Users::FindUser.run(user_id:)
    @pagy, @frames = list_frames(user_id:, page: permitted_params[:page])
  end

  # followees list (フォロイー一覧)
  def followees
    @users = Queries::Users::ListFollowees.run(user_id: permitted_params[:id])
  end

  # followers list (フォロワー一覧)
  def followers
    @users = Queries::Users::ListFollowers.run(user_id: permitted_params[:id])
  end

  private

  def permitted_params
    params.permit(:id, :q, :page, :ref).to_h
  end

  def query_map
    items = permitted_params[:q]

    items.present? ? { q: items } : {}
  end

  def default_ref_items
    { from: "user_profile", id: permitted_params[:id] }
  end
end
