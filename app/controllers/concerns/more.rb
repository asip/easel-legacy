# frozen_string_literal: true

# More module
module More
  extend ActiveSupport::Concern

  SKIP_ACTION_LIST_FOR_AUTH = %i[next prev]

  included do
    skip_before_action :authenticate_user!, only: SKIP_ACTION_LIST_FOR_AUTH
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
    render_stream
  end
end
