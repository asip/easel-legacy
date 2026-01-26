# frozen_string_literal: true

# Authentication::Login::Save module
module Authentication::Login::Save
  extend ActiveSupport::Concern

  class_methods do
    def create_from(user:, auth:)
      mutation = Mutations::Authentication::CreateFromUserAndAuth.run(user:, auth:)
      mutation.authentication
    end
  end
end
