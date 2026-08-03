# frozen_string_literal: true

# Frames::Cookies::Criteria class
class Frames::Cookies::Criteria
  def initialize(cookies)
    @cookies = cookies
  end

  def criteria
    criteria = @cookies[:q]
    criteria.present? ? criteria : "{}"
  end

  def self.build(cookies)
    self.new(cookies).criteria
  end
end
