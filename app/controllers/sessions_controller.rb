# frozen_string_literal: true

# Sessions Controller
class SessionsController < ApplicationController
  include Query::Search
  include Query::List
  include Queries::Sessions::Pagination
  include Ref::SessionRef
  include Query::SessionQuery
  include Session

  before_action :set_prev_url, only: [ :show ]

  def show
    self.user = current_user
    @pagy, @frames = list_frames(user: user, page: permitted_params[:page])
  end

  private

  attr_accessor :user

  def set_prev_url
    from = request.referer
    unless from&.include?("/profile") || from&.include?("/account/password/edit") ||
           from&.include?("/frames/new")
      path = root_path(query_map)
      if from&.include?("/frame") && from&.include?("profile")
        session[:prev_url] = path
      else
        session[:prev_url] = from || path
      end
    end
  end

  def permitted_params
    @permitted_params ||= params.permit(:q, :page).to_h
  end
end
