class Frame < ApplicationRecord
  #has_one_attached :image
  attachment :image, type: :image
  acts_as_taggable_on :tags

  paginates_per 8

  validates_acceptance_of :confirming

  validates :name, length: { in: 1..20 }
  validates :image, presence: true
  validate :check_tag

  after_validation :check_confirming

  def tags_preview
    self.tag_list.to_s.split(/\s*,\s*/)
  end

  private

  def check_confirming
    errors.delete(:confirming)
    self.confirming = errors.empty? ? 'true' : ''
  end

  def check_tag
    if self.tags_preview.size > 5
      self.errors[:tag_list] << 'は５つまでしかセットできまん'
    end
    self.tags_preview.each do |tag|
      puts tag.to_s
      if tag.to_s.size > 10
        self.errors[:tag_list] << 'は10文字以内で入力してください'
        break
      end
    end
  end
end
