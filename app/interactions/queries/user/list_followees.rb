# frozen_string_literal: true

# Queries::User::ListFollowees class
class Queries::User::ListFollowees
  include Query

  def initialize(user_id:)
    @user_id = user_id
  end

  def execute
    User.with_discarded.find(@user_id).followees
  end
end
