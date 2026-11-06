# frozen_string_literal: true

# Api::Account::Renderable module
module Api::Account::Renderable
  extend ActiveSupport::Concern

  protected

  def render_account(account)
    render_resource AccountResource.new(account).serialize
  end
end
