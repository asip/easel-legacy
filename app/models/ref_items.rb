# frozen_string_literal: true

#
# RefItems class
#
class RefItems
  include ActiveModel::API
  include ActiveModel::Attributes

  attribute :from, :string
  attribute :page, :string

  def initialize(attributes = {})
    super(attributes)
  end

  def to_h
    attributes.with_indifferent_access.compact
  end
end
