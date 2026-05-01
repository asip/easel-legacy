# frozen_string_literal: true

# Account Resource
class AccountResource < UserResource
  # typelize "string"
  attribute :email, &:email

  # typelize "boolean"
  attribute :social_login, &:social_login?
end
