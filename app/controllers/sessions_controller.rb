# frozen_string_literal: true

# Sessions Controller
class SessionsController < ApplicationController
  include Sessions::Queries::Pagination
  include PageTransition::Query::Ref
  include PageTransition::Query::List
  include Sessions::Location::Store
  include Sessions::Variables
  include More

  def show
    self.cookie_query_map.page = page_number
    @pagy, @frames = list_frames(user: current_user, page: cookie_query_map.page)
  end

  def index
    show
  end
end
