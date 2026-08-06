# frozen_string_literal: true

#
# AuthInfo class
#
class AuthInfo
  include ActiveModel::API
  include ActiveModel::Attributes
  include Google

  attribute :uid, :string
  attribute :provider, :string
  attribute :name, :string
  attribute :email, :string

  def initialize(attributes)
    super(attributes)
  end

  def to_h
    attributes.with_indifferent_access
  end
end
