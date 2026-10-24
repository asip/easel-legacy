# frozen_string_literal: true

# PageTransition::Query::Ref::QueryMap class
class PageTransition::Query::Ref::QueryMap
  def self.build(ref_items:)
    query = ::QueryMap.new
    query.ref = JsonUtil.stringify(ref_items) if ref_items.present?
    query.to_h
  end
end
