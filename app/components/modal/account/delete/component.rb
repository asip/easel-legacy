# frozen_string_literal: true

# Modal::Account::Delete::Component class
class Modal::Account::Delete::Component < ViewComponent::Base
  def initialize(path:)
    @path = path
  end
end
