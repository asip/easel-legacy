# frozen_string_literal: true

# Frame Search Form
class FrameSearchForm
  include ActiveModel::API
  include ActiveModel::Attributes

  attribute :word, :string
  attribute :tag_name, :string

  # validates :word, length: { maximum: 40 }
  # validates :tag_name, length: { maximum: 10 }

  def initialize(attributes)
    super(attributes)
  end

  def to_h
    self.attributes.with_indifferent_access
  end
end
