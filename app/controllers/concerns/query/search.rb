# frozen_string_literal: true

# query
module Query
  # Search module
  module Search
    extend ActiveSupport::Concern

    included do
      helper_method :q_str
      helper_method :page_str
      helper_method :day_str
      helper_method :q_items
      helper_method :query_map
      helper_method :paging_query_map
    end

    protected

    def query_list
      %i[q ref page]
    end

    def query_map
      @query_map ||= permitted_params.to_h.filter do |key, value|
        query_list.include?(key.to_sym) if value.present?
      end
    end

    def paging_query_map(page:)
      query = {}
      query[:q] = q_str if q_str.present?
      query[:page] = page if page.present? && page != "1"
      query
    end

    def q_items
      @q_items ||= Json::Util.to_hash(permitted_params[:q])
      @q_items
    end

    def q_str
      items = permitted_params[:q]
      items.present? ? items : nil
    end

    def ref_str
      items = permitted_params[:ref]
      items.present? ? items : nil
    end

    def page_str
      page = permitted_params[:page]
      page.present? && page != "1" ? page : nil
    end

    def day_str
      word = q_items[:word]
      day = if word.blank? || !DateAndTime::Util.valid_date?(word)
        ""
      else
        word
      end
      day
    end
  end
end
