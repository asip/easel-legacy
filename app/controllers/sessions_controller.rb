# frozen_string_literal: true

# Sessions Controller
class SessionsController < ApplicationController
  include Query::Search
  include Queries::Sessions::Pagination

  skip_before_action :authenticate_user!

  def show
    @user = current_user
    @pagy, @frames = list_frames_query(user: @user, page: path_params[:page])
  end

  private

  def query_map
    {}
  end

  def path_params
    params.permit(:page)
  end
end
