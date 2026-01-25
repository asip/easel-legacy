# frozen_string_literal: true

# Queries::Users::ListFollowers class
class Queries::Users::ListFollowers
  include Query

  def initialize(user_id:)
    @user_id = user_id
  end

  def execute
    User.with_discarded.find(@user_id).followers
  end
end
