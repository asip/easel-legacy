# frozen_string_literal: true

# == Schema Information
#
# Table name: frames
#
#  id         :bigint           not null, primary key
#  comment    :text(65535)
#  file_data  :text(65535)
#  name       :string(255)      not null
#  shooted_at :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

# Frame
class Frame < ApplicationRecord
  include Screen::Confirmable
  # has_one_attached :file
  include Contents::Uploader::Attachment(:file)
  include DateAndTime::Util

  acts_as_taggable_on :tags

  has_many :comments
  belongs_to :user

  paginates_per 8

  validates :name, length: { in: 1..20 }
  validates :file, presence: true
  validate :check_tag

  scope :search_by, lambda { |word:|
    scope = current_scope || relation

    if word.present?
      scope = if date_valid?(word)
                scope.where('cast(shooted_at as date)=?', Time.zone.parse(word).to_date)
                     .or(Frame.where('cast(updated_at as date)=?', Time.zone.parse(word).to_date))
              else
                scope.joins(:tags, :user)
                     .merge(ActsAsTaggableOn::Tag.where('tags.name like ?', "%#{word}%"))
                     .or(Frame.where('frames.name like ?', "%#{word}%"))
                     .or(User.where(name: word))
              end
    end

    scope
  }

  def user_name
    self.user.name
  end

  def tags_preview
    tag_list.to_s.split(/\s*,\s*/)
  end

  private

  def check_tag
    errors[:tag_list] << 'は５つまでしかセットできません' if tags_preview.size > 5
    tags_preview.each do |tag|
      # puts tag.to_s
      if tag.to_s.size > 10
        errors[:tag_list] << 'は10文字以内で入力してください'
        break
      end
    end
  end
end
