# frozen_string_literal: true

#
# QueryMap class
#
class QueryMap
  include ActiveModel::API
  include ActiveModel::Attributes
  include Google

  attribute :ref, :string
  attribute :page, :string

  def initialize(ref:, page:)
    attributes = { ref:, page: }
    super(attributes)
  end

  def ref_items
    @ref_items ||= JsonUtil.to_hash(ref)
  end

  def to_h
    attributes.with_indifferent_access
  end
end
