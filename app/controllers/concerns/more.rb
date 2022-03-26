# frozen_string_literal: true

# More Module
module More
  extend ActiveSupport::Concern

  def prev
    more
  end

  def next
    more
  end

  protected

  def more
    index
    render layout: false, content_type: 'text/vnd.turbo-stream.html'
  end
end
