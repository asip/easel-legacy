# frozen_string_literal: true

# authentication/login/save module
module Authentication::Login::Save
  extend ActiveSupport::Concern

  class_methods do
    def create_from(user:, provider:, uid:)
      authentication = ::Authentication.new(user:, provider:, uid:)
      authentication.save!
    end
  end
end
