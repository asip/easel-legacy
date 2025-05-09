# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                         :bigint           not null, primary key
#  crypted_password           :string
#  deleted_at                 :datetime
#  email                      :string           not null
#  failed_logins_count        :integer          default(0)
#  image_data                 :text
#  last_activity_at           :datetime
#  last_login_at              :datetime
#  last_login_from_ip_address :string
#  last_logout_at             :datetime
#  lock_expires_at            :datetime
#  name                       :string           not null
#  salt                       :string
#  token                      :string
#  unlock_token               :string
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#
# Indexes
#
#  index_users_on_deleted_at                           (deleted_at)
#  index_users_on_email                                (email) UNIQUE
#  index_users_on_last_logout_at_and_last_activity_at  (last_logout_at,last_activity_at)
#  index_users_on_token                                (token) UNIQUE
#  index_users_on_unlock_token                         (unlock_token)
#

# User
class User < ApplicationRecord
  include Errors::Sortable
  include Page::Confirmable
  include Discard::Model
  include Profile::Image::Uploader::Attachment(:image)

  authenticates_with_sorcery!

  self.discard_column = :deleted_at

  attr_accessor :token

  has_many :authentications, dependent: :destroy
  accepts_nested_attributes_for :authentications

  has_many :frames, dependent: :destroy
  has_many :comments, dependent: :destroy

  # (フォローをした、されたの関係)
  has_many :follower_relationships, class_name: "FollowRelationship", foreign_key: "follower_id",
                                    inverse_of: :follower, dependent: :destroy
  has_many :followee_relationships, class_name: "FollowRelationship", foreign_key: "followee_id",
                                    inverse_of: :followee, dependent: :destroy

  # (一覧画面で使う)
  has_many :followees, through: :follower_relationships, source: :followee
  has_many :followers, through: :followee_relationships, source: :follower

  # VALID_NAME_REGEX = /\A\z|\A[a-zA-Z\d\s]{3,40}\z/

  validates :password, length: { minimum: 3 }, confirmation: true,
                       if: -> { new_record? || changes[:crypted_password] },
                       on: :with_validation
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] },
                                    on: :with_validation
  validates :name, length: { minimum: 1, maximum: 40 },
                   on: :with_validation # , format: { with: VALID_NAME_REGEX }
  validates :email, length: { minimum: 3, maximum: 319 }, format: { with: URI::MailTo::EMAIL_REGEXP },
                    uniqueness: true,
                    on: :with_validation

  validates :email, presence: true, on: :login
  validates :password, presence: true, on: :login

  after_validation :assign_derivatives

  default_scope -> { kept }

  def image_url_for_view(key)
    if image.blank?
      "#{Settings.origin}/no-profile-image.png"
    else
      image_url(key)
    end
  end

  def token_expire?
    User.decode_token(token)
    # Rails.logger.debug(decode_token[0]['exp'])
    # decode_token[0]['exp'] < Time.zone.now.to_i
    false
  rescue StandardError # => e
    true
  end

  def full_error_messages
    full_error_messages_for(%i[image name email password password_confirmation])
  end

  def full_error_messages_on_login
    full_error_messages_for(%i[email password])
  end

  def assign_user_info(user_info)
    self.name = user_info["name"]
    self.email = user_info["email"]
    self.save!
  end

  def assign_token(token_)
    @token =token_
  end

  def update_token
    return unless saved_change_to_email?

    assign_token(User.issue_token(id:, email:))
  end

  def reset_token
    @token = nil
  end

  def assign_derivatives
    return if image.blank?
    return unless errors[:image].empty?

    image_derivatives!
  end

  # (フォローしたときの処理)
  def follow(user_id)
    follower_relationships.create(followee_id: user_id)
  end

  # (フォローを外すときの処理)
  def unfollow(user_id)
    follower_relationships.find_by(followee_id: user_id)&.destroy
  end

  # (フォローしているか判定)
  def following?(user)
    followees.include?(user)
  end

  def social_login?
    authentications.present?
  end

  def self.validate_login(form_params:)
    user = User.find_by(email: form_params[:email])
    if user
      user.validate_password_on_login(form_params)
    else
      user = User.new(form_params)
      user.validate_email_on_login(form_params)
    end
    success = user.errors.empty?
    [ success, user ]
  end

  def validate_password_on_login(form_params)
    self.password = form_params[:password]
    valid?(:login)
    errors.add(:password, I18n.t("action.login.invalid")) if form_params[:password].present?
  end

  def validate_email_on_login(form_params)
    valid?(:login)
    errors.add(:email, I18n.t("action.login.invalid")) if form_params[:email].present?
  end
end
