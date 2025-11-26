# frozen_string_literal: true

# account / Passwords Controller
class Account::PasswordsController < ApplicationController
  include PageTransition::Query::Search
  include Session

  # before_action :authenticate_user!

  before_action :store_location, only: [ :edit ]

  def show
    redirect_to edit_account_password_path
  end

  def edit
  end

  def update
    if current_user.update_with_password(password_params)
      bypass_sign_in current_user
      redirect_to prev_url_for(path: edit_account_password_path), notice: "パスワードを更新しました。"
    else
      # puts current_user.errors.to_hash(true)
      flashes[:alert] = current_user.full_error_messages unless current_user.errors.empty?
      render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_entity
    end
  end

  private

  def store_location
    from = request.referer
    self.prev_url = from || profile_path  if !from&.include?("/account/password/edit")
  end

  def password_params
    @password_params ||= params.expect(
      user: [ :current_password, :password, :password_confirmation ]
    ).to_h
  end
end
