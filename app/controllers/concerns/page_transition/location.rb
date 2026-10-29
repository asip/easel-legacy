# page location module
module PageTransition::Location
  extend ActiveSupport::Concern

  included do
    helper_method :back_to_path
  end

  def from
    @from ||= request.referer
  end

  def back_to_path
    @back_to_path ||= location.prev_url
  end
end
