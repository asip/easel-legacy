# frozen_string_literal: true

# Sessions Controller
class SessionsController < ApplicationController
  include Sessions::Queries::Pagination
  include PageTransition::Query::Ref
  include Sessions::PageTransition::List
  include Sessions::Location::Store
  include Cookie
  include More

  def show
    self.user = current_user
    @pagy, @frames = list_frames(user: user, page:)
  end

  def index
    show
  end

  private

  attr_accessor :user

  def permitted_params
    @permitted_params ||= params.permit(:page).to_h
  end
end
