class Frame < ApplicationRecord
  #has_one_attached :image
  attachment :image, type: :image

  paginates_per 8

  validates_acceptance_of :confirming

  validates :name, length: { in: 1..20 }
  validates :image, presence: true

  after_validation :check_confirming

  def check_confirming
    errors.delete(:confirming)
    self.confirming = errors.empty? ? 'true' : ''
  end
end
