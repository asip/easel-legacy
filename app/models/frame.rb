class Frame < ApplicationRecord
  #has_one_attached :image
  attachment :image, type: :image
  acts_as_taggable_on :tags

  paginates_per 8

  validates_acceptance_of :confirming

  validates :name, length: { in: 1..20 }
  validates :image, presence: true

  after_validation :check_confirming

  def tags_preview
    self.tag_list.to_s.split(/\s*,\s*/)
  end

  def check_confirming
    errors.delete(:confirming)
    self.confirming = errors.empty? ? 'true' : ''
  end
end
