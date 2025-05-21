# frozen_string_literal: true

class Admins::SessionsController < Devise::SessionsController
  include Flashes

  layout "admins/application"

  skip_before_action :authenticate_user!

  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate(auth_options)
    set_flash_message!(:notice, :signed_in) if resource
    sign_in(resource_name, resource) if resource
    # yield resource if block_given?
    respond_with resource
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  private

  def respond_with(resource, _opts = {})
    if resource
      case action_name
      when "create"
        login_success(resource)
      end
    else
      login_failed
    end
  end

  def login_success(resource)
    redirect_to after_sign_out_path_for(resource)
  end

  def login_failed
    success, admin = Admin.validate_login(form_params: sign_in_params)
    return if success
    self.resource = admin
    flashes[:alert] = self.resource.full_error_messages_on_login
    render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_entity
  end

  protected

  def auth_options
    { scope: resource_name, recall: "#{controller_path}#login_failed" }
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  def after_sign_out_path_for(resource)
    rails_admin_path
  end
end
