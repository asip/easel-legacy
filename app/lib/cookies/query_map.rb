# frozen_string_literal: true

# Cookies::QueryMap class
class Cookies::QueryMap
  def initialize(cookies)
    @cookies = cookies
    build
  end

  def build
    query = ::QueryMap.new
    query.ref = cookie_ref if cookie_ref.present?
    query.page = cookie_page if cookie_page.present? && cookie_page != "1"
    @model = query
  end

  private :build

  def cookie_ref
    items = @cookies[:ref]
    items.present? ? items : nil
  end

  private :cookie_ref

  def cookie_page
    @cookies[:page]
  end

  private :cookie_page

  attr_reader :model

  def ref
    self.model.ref
  end

  # def ref=(ref)
  #  self.model.ref = ref
  #  @cookies[:ref] = ref
  # end

  def ref_items
    self.model.ref_items
  end

  # def ref_items=(ref_items)
  #  self.model.ref_items = ref_items
  #  self.ref = model.ref
  # end

  def page
    self.model.page
  end

  def page=(page)
    self.model.page = page
    self.cookies[:page] = page
  end

  def self.from(cookies)
    self.new(cookies)
  end
end
