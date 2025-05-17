# frozen_string_literal: true

# More module
module More
  extend ActiveSupport::Concern

  included do
    skip_before_action :authenticate_user!, only: %i[next prev]
    before_action :set_query, only: %i[next prev]
  end

  def prev
    more
  end

  def next
    more
  end

  protected

  def more
    index
    render layout: false, content_type: "text/vnd.turbo-stream.html"
  end
end
