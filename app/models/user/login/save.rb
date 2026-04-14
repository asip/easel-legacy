# frozen_string_literal: true

# user/login/Save module
module User::Login::Save
  extend ActiveSupport::Concern

  class_methods do
    def from(auth:, time_zone:)
      mutation = Mutations::User::FromAuthAndTimeZone.run(auth:, time_zone:)
      mutation.user
    end
  end
end
