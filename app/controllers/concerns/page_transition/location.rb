# page location module
module PageTransition::Location
  include ActiveSupport::Concern

  def from
    @from ||= request.referer
  end
end
