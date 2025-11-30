# frozen_string_literal: true

# Sessions Controller
class SessionsController < ApplicationController
  include Queries::Sessions::Pagination
  include PageTransition::Query::Search
  include PageTransition::Query::List
  include PageTransition::Ref::SessionRef
  include Cookie

  before_action :store_location, only: [ :show ]

  def show
    self.user = current_user
    @pagy, @frames = list_frames(user: user, page:)
  end

  private

  attr_accessor :user

  def store_location
    from = request.referer
    unless from&.include?("/profile") || from&.include?("/account/password/edit") ||
           from&.include?("/frames/new")
      path = root_path
      if from&.include?("/frame") && from&.include?("profile")
        self.prev_url = path
      else
        self.prev_url = from || path
      end
    end
  end

  def permitted_params
    @permitted_params ||= params.permit(:page).to_h
  end
end
