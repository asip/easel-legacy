# frozen_string_literal: true

# Cookies::QueryMap class
class Cookies::QueryMap
  def initialize(cookies)
    @cookies = cookies
    @model = ::QueryMap.new(build)
  end

  def build
    query = {}
    query[:ref] = cookie_ref if cookie_ref.present?
    query[:page] = cookie_page if cookie_page.present? && cookie_page != "1"
    query
  end

  private :build_query

  def cookie_ref
    items = @cookies[:ref]
    items.present? ? items : nil
  end

  private :cookie_ref

  def cookie_page
    @cookies[:page]
  end

  private :cookie_page

  def model
    @model
  end

  def ref
    @model.ref
  end

  def ref_items
    @model.ref_items
  end

  def page
    @model.page
  end

  def page=(page)
    @model.page = page
    @cookies[:page] = page
  end

  def self.from(cookies)
    self.new(cookies)
  end
end
