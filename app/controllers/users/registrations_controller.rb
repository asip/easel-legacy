# frozen_string_literal: true

# users / Registrations Controller
class Users::RegistrationsController < Devise::RegistrationsController
  include Users::Registrations::Confirmable
  include Cookie

  # GET /resource/sign_up
  def new
    build_resource
    resource.confirming = false
    yield resource if block_given?
    respond_with resource
  end

  # POST /resource
  def create
    resource.save
    yield resource if block_given?
    if resource.confirming
      if resource.active_for_authentication?
        login_success
      else
        login_failed
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  # GET /resource/edit
  def edit
    resource.confirming = false
    super
  end

  # PUT /resource
  def update
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    self.resource_updated = update_resource(resource, account_update_params)
    yield resource if block_given?
    if resource.confirming.present?
      if resource_updated
        set_flash_message_for_update(resource, prev_unconfirmed_email)
        bypass_sign_in resource, scope: resource_name if sign_in_after_change_password?
        # else
        #   # clean_up_passwords resource
        #   # set_minimum_password_length
      end
    end
    respond_with resource
  end

  # DELETE /resource
  def destroy
    resource.discard
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    set_flash_message! :notice, :destroyed
    yield resource if block_given?
    redirect_to root_path, status: :see_other
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  def login_success
    if resource.persisted?
      set_flash_message! :notice, :signed_up
      sign_up(resource_name, resource)
    end
    respond_with resource, location: after_sign_up_path_for(resource)
  end

  def login_failed
    set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
    expire_data_after_sign_in!
    respond_with resource, location: after_inactive_sign_up_path_for(resource)
  end

  def respond_with(resource, _opts = {})
    case action_name
    when "create"
      create_with(resource)
    when "update"
      update_with
    else
      self.create_or_update = false
    end

    redirect_or_render(resource)
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

  private

  attr_accessor :resource_updated

  attr_accessor :saved
  attr_accessor :redirect_path
  attr_accessor :create_or_update

  def create_with(resource)
    self.saved = resource.persisted?
    self.redirect_path = prev_url_for(path: login_path) || root_path
    self.create_or_update = true
  end

  def update_with
    self.saved = resource_updated
    self.redirect_path = profile_path
    self.create_or_update = true
  end

  def redirect_or_render(resource)
    if create_or_update
      if saved
        redirect_to redirect_path
      else
        render_with_flash(resource)
      end
    end
  end

  def render_with_flash(resource)
    flashes[:alert] = resource.full_error_messages unless resource.errors.empty?
    # puts resource.errors.to_hash(true)
    render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_content
  end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
