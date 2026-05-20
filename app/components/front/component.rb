# frozen_string_literal: true

# Front::Component class
class Front::Component < ViewComponent::Base
  def initialize(path:, view_data: {})
    @path = path
    @view_data = view_data || {}
  end
end
