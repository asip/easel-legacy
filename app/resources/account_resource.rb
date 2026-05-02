# frozen_string_literal: true

# Account Resource
class AccountResource < UserResource
  attributes :email

  attribute :social_login, &:social_login?

  typelize id: :number, name: :string
  typelize email: :string, social_login: :boolean
end
