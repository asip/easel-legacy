# frozen_string_literal: true

# Users Controller
class UsersController < ApplicationController
  include Query::Search
  include Ref::UserRef
  include Queries::Users::Pagination

  helper_method :ref_map_for_list

  skip_before_action :authenticate_user!

  before_action :set_query_items, only: %i[show]

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
    params.permit(:id, :page, :ref, :q)
  end

  def set_query_items
    @items = query_items
  end

  def query_items
    items = ref_items["q"] || permitted_params[:q]
    items.present? ? JSON.parse(items) : {}
  end

  def query_map
    items = ref_items["q"] || permitted_params[:q]

    items.present? ? { q: items } : {}
  end

  def ref_map_for_list
    { ref: ref_items_for_list.to_json }
  end

  def ref_items_for_list
    { from: "user_profile", id: permitted_params[:id] }
  end
end
