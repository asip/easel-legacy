# frozen_string_literal: true

# Popover::Account::Delete::Component class
class Popover::Account::Delete::Component < ViewComponent::Base
  def initialize(path:)
    @path = path
  end
end
