# page location module
module PageLocation
  include ActiveSupport::Concern

  def from
    @from ||= request.referer
  end
end
