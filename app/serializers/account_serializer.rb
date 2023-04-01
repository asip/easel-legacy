# frozen_string_literal: true

# Account Serializer
class AccountSerializer < UserSerializer
  attributes :token

  attribute :social_login, &:social_login?
end
