# frozen_string_literal: true

# account / Passwords Controller
class Account::PasswordsController < ApplicationController
  include Account::Passwords::Location::Store
  include Account::Passwords::Variables

  def show
    redirect_to edit_account_password_path
  end

  def edit
  end

  def update
    if current_user.update_with_password(form_params)
      bypass_sign_in current_user
      redirect_to prev_url_for(path: edit_account_password_path), notice: "パスワードを更新しました。"
    else
      render_error_stream
    end
  end
end
