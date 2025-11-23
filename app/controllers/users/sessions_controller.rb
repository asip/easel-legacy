# frozen_string_literal: true

# users / Sessions Controller
class Users::SessionsController < Devise::SessionsController
  include Flashes
  include PageTransition::Query::Search
  include Session

  # before_action :configure_sign_in_params, only: [:create]
  before_action :set_prev_url, only: [ :new ]

  # GET /resource/sign_in
  def new
    super
  end

  # POST /resource/sign_in
  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate(auth_options)
    if resource
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      # yield resource if block_given?

      resource.assign_token(resource.create_token)
      cookies[:access_token] = { value: resource.token }
    end

    respond_with resource
  end

  # DELETE /resource/sign_out
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?
    cookies.delete(:access_token)
    respond_to_on_destroy
  end

  private

  def set_prev_url
    from = request.referer
    session[:prev_url] = from || root_path(query_map) unless from&.include?("/signup")
  end

  def q_items
    {}
  end

  def query_map
    {}
  end

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
    redirect_to session.delete(:prev_url) || after_sign_out_path_for(resource)
  end

  def login_failed
    success, user = User.validate_on_login(form_params: sign_in_params)
    self.resource = user unless success
    flashes[:alert] = resource.full_error_messages_on_login
    render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_entity
  end

  protected

  def auth_options
    { scope: resource_name, locale: I18n.locale }
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
