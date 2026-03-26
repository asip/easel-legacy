# frozen_string_literal: true

# Users Controller
class UsersController < ApplicationController
  include Users::Authentication::Skip
  include Users::Queries::Pagination
  include Users::PageTransition::Ref
  include Users::PageTransition::List
  include Users::Location::Store
  include Cookie
  include More

  def show
    @user = Queries::User::FindUser.run(user_id:)
    @pagy, @frames = list_frames(user_id:, page:)
  end

  def index
    self.page = permitted_params[:page]
    @pagy, @frames = list_frames(user_id:, page:)
  end

  # followees list (フォロイー一覧)
  def followees
    @users = Queries::User::ListFollowees.run(user_id:)
  end

  # followers list (フォロワー一覧)
  def followers
    @users = Queries::User::ListFollowers.run(user_id:)
  end

  private

  def permitted_params
    @permitted_params ||= params.permit(:id, :user_id, :page).to_h
  end

  def user_id
    permitted_params[:id]
  end
end
