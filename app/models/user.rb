class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :frames
  has_many :comments

  validates_acceptance_of :confirming

  VALID_EMAIL_REGEX = /\A\z|\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  with_options on: [:create, :update] do |save|
    save.validates :name, presence: true, uniqueness: true

    save.validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }

    save.validates :password, length: { minimum: 3 }, if: -> { new_record? || changes[:crypted_password] }
    save.validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
    save.validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }
  end

  with_options on: :login do |login|
    login.validates :email, presence: true
    login.validates :password, presence: true
  end

  after_validation :check_confirming

  private

  def check_confirming
    errors.delete(:confirming)
    self.confirming = errors.empty? ? 'true' : ''
  end
end
