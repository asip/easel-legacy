# frozen_string_literal: true

# Users Controller
class UsersController < ApplicationController
  include Query::Search
  include Query::List
  include Ref::UserRef
  include Queries::Users::Pagination
  include Session

  skip_before_action :authenticate_user!

  before_action :set_prev_url, only: [ :show ]

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

  def set_prev_url
    from = request.referer
    unless from&.include?("/user") || from&.include?("/profile") ||
           from&.include?("/account/password/edit") || from&.include?("/frames/new")
      path = root_path(query_map)
      if from&.include?("/frame") && from&.include?("user_profile")
        session[:prev_url] = path
      else
        session[:prev_url] = from || path
      end
    end
  end

  def permitted_params
    @permitted_params ||= params.permit(:id, :q, :page, :ref).to_h
  end

  def query_map
    items_q = permitted_params[:q]

    items_q.present? ? { q: items_q } : {}
  end

  def ref_items_for_frame
    { from: "user_profile", id: permitted_params[:id] }
  end
end
