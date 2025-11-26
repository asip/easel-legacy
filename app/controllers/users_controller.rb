# frozen_string_literal: true

# Users Controller
class UsersController < ApplicationController
  include Queries::Users::Pagination
  include PageTransition::Query::Search
  include PageTransition::Query::List
  include PageTransition::Ref::UserRef
  include Session

  skip_before_action :authenticate_user!

  before_action :store_location, only: [ :show ]

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

  def store_location
    from = request.referer
    unless from&.include?("/user") || from&.include?("/profile") ||
           from&.include?("/account/password/edit") || from&.include?("/frames/new")
      path = root_path(query_map)
      if from&.include?("/frame") && from&.include?("user_profile")
        self.prev_url = path
      else
        self.prev_url = from || path
      end
    end
  end

  def permitted_params
    @permitted_params ||= params.permit(:id, :q, :page, :ref).to_h
  end
end
