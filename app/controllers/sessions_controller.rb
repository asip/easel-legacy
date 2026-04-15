# frozen_string_literal: true

# Sessions Controller
class SessionsController < ApplicationController
  include Sessions::Queries::Pagination
  include PageTransition::Query::Ref
  include Sessions::PageTransition::List
  include Sessions::Location::Store
  include Sessions::Variables
  include More

  def show
    self.page = route_params[:page]
    @pagy, @frames = list_frames(user: current_user, page:)
  end

  def index
    show
  end
end
