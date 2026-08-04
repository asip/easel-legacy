
# frozen_string_literal: true

# Api::Session Module
module Api::Session
  extend ActiveSupport::Concern

  protected

  def account
    @account = Session::Account.from(session)
  end
end
