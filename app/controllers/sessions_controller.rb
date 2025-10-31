# frozen_string_literal: true

# Sessions Controller
class SessionsController < ApplicationController
  include Query::Search
  include Query::List
  include Queries::Sessions::Pagination

  def show
    from = request.referer
    session[:prev_url] = from || root_path(query_map) unless from&.include?("/profile") || from&.include?("/account/password/edit")
    @prev_url = session[:prev_url]
    @user = current_user
    @pagy, @frames = list_frames(user: @user, page: permitted_params[:page])
  end

  private

  def query_map
    {}
  end

  def ref_items_for_list
    { from: "profile" }
  end

  def permitted_params
    params.permit(:page, :q)
  end
end
