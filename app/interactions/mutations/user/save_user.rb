# frozen_string_literal: true

# Mutations::User::SaveUser class
class Mutations::User::SaveUser
  include Mutation

  attr_reader :user

  def initialize(user:)
    self.user = user
  end

  def execute
    self.success = user.save(context: :with_validation)

    errors.merge!(user.errors) unless success
  end

  def success?
    success
  end

  private

  attr_accessor :success

  def user=(user)
    @user = user
  end
end
