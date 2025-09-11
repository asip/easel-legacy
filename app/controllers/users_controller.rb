# frozen_string_literal: true

# Users Controller
class UsersController < ApplicationController
  include Query::Search
  include Ref::User
  include Queries::Users::Pagination

  skip_before_action :authenticate_user!

  before_action :set_query, only: %i[show]

  def show
    user_id = permitted_params[:id]
    @user = Queries::Users::FindUser.run(user_id:)
    @pagy, @frames = list_frames_query(user_id:, page: permitted_params[:page])
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
    params.permit(:id, :page, :ref)
  end

  def set_query
    items_ = JSON.parse(permitted_params[:ref])["q"]
    @items = items_.present? ? JSON.parse(items_) : {}
  end

  def query_map
    items = JSON.parse(permitted_params[:ref])["q"]
    items.present? ? { q: items } : {}
  end
end
