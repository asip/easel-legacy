# frozen_string_literal: true

# Sessions Controller
class SessionsController < ApplicationController
  include Query::Search
  include Queries::Sessions::Pagination

  helper_method :ref_map_for_list

  skip_before_action :authenticate_user!

  def show
    @user = current_user
    @pagy, @frames = list_frames_query(user: @user, page: permitted_params[:page])
  end

  private

  def query_map
    {}
  end

  def ref_map_for_list
    { ref: ref_items_for_list.to_json }
  end

  def ref_items_for_list
    { from: "profile" }
  end

  def permitted_params
    params.permit(:page, :q)
  end
end
