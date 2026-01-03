# frozen_string_literal: true

# Users Controller
class UsersController < ApplicationController
  include Account::Authentication::Skip
  include Queries::Users::Pagination
  include PageTransition::Query::Ref
  include PageTransition::User::List
  include Location::Users::Store
  include Cookie

  def show
    user_id = permitted_params[:id]
    @user = Queries::Users::FindUser.run(user_id:)
    @pagy, @frames = list_frames(user_id:, page:)
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
    @permitted_params ||= params.permit(:id, :page, :ref).to_h
  end
end
