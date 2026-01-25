# frozen_string_literal: true

# Queries::Users::ListFollowees class
class Queries::Users::ListFollowees
  include Query

  def initialize(user_id:)
    @user_id = user_id
  end

  def execute
    User.with_discarded.find(@user_id).followees
  end
end
