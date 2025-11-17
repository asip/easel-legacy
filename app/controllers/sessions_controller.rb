# frozen_string_literal: true

# Sessions Controller
class SessionsController < ApplicationController
  include Query::Search
  include Query::List
  include Queries::Sessions::Pagination
  include Session

  def show
    from = request.referer
    unless from&.include?("/profile") || from&.include?("/account/password/edit") || from&.include?("/frames/new")
      session[:prev_url] = from || root_path(query_map)
    end
    self.user = current_user
    @pagy, @frames = list_frames(user: user, page: permitted_params[:page])
  end

  private

  attr_accessor :user

  def query_map
    {}
  end

  def ref_items_for_list
    { from: "profile" }
  end

  def permitted_params
    params.permit(:q, :page).to_h
  end
end
