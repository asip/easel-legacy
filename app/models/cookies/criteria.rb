# frozen_string_literal: true

# Cookies::Criteria class
class Cookies::Criteria
  def initialize(cookies)
    @cookies = cookies
  end

  def criteria
    criteria = @cookies[:q]
    criteria.present? ? criteria : "{}"
  end

  def self.from(cookies)
    self.new(cookies).criteria
  end
end
