# frozen_string_literal: true

# account / Passwords Controller
class Account::PasswordsController < ApplicationController
  include Query::Search

  # before_action :authenticate_user!

  def show
    redirect_to edit_account_password_path
  end

  def edit
  end
  def update
    if current_user.update_with_password(password_params)
      bypass_sign_in current_user
      redirect_to profile_path, notice: "パスワードを更新しました。"
    else
      # puts current_user.errors.to_hash(true)
      flashes[:alert] = current_user.full_error_messages unless current_user.errors.empty?
      render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_entity
    end
  end

  private

  def password_params
    @password_params ||= params.expect(
      user: [ :current_password, :password, :password_confirmation ]
    ).to_h
  end

  def q_items
    {}
  end

  def query_map
    {}
  end
end
