# frozen_string_literal: true

# query
module Query
  # Search module
  module Search
    extend ActiveSupport::Concern

    included do
      # helper_method :query_list
      helper_method :q_str
      helper_method :page_str
      helper_method :day_str
      helper_method :q_items
      helper_method :query_map
      helper_method :paging_query_map
    end

    protected

    def query_list
      %i[page q]
    end

    def query_map
      permitted_params.to_h.filter do |key, value|
        query_list.include?(key.to_sym) if value.present?
      end
    end

    def paging_query_map(page:)
      items = permitted_params[:q]
      query = {}
      query[:q] = items if items.present?
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

    def page_str
      permitted_params[:page]
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
