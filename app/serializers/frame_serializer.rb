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

# Frame Serializer
class FrameSerializer
  include JSONAPI::Serializer
  attributes :user_id, :user_name, :name, :comment
  has_many :comments, serializer: CommentSerializer

  attribute :shooted_at do |object|
    object.shooted_at.present? ? I18n.l(object.shooted_at, format: '%Y/%m/%d %H:%M') : ''
  end

  attribute :shooted_at_html do |object|
    object.shooted_at.present? ? I18n.l(object.shooted_at) : ''
  end

  attribute :created_at do |object|
    I18n.l(object.created_at)
  end

  attribute :updated_at do |object|
    I18n.l(object.updated_at)
  end

  attribute :tag_list do |object|
    object.tags_preview.join(',')
  end

  attribute :tags do |object|
    object.tags_preview
  end

  attribute :file_url do |object|
    object.file_url
  end

  attribute :file_two_url do |object|
    object.file_url(:two)
  end

  attribute :file_three_url do |object|
    object.file_url(:three)
  end
end
