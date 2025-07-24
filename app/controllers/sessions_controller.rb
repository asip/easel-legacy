# frozen_string_literal: true

# Sessions Controller
class SessionsController < ApplicationController
  include Query::Search

  skip_before_action :authenticate_user!

  def show
    @user = current_user
  end

  private

  def query_params
    {}
  end
end
