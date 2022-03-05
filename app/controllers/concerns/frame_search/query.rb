module FrameSearch
  module Query
    extend ActiveSupport::Concern

    included do
      helper_method :query_list
      helper_method :query_params
    end

    def query_list
      [:page, :q]
    end

    def query_params
      permitted_params.to_h.filter { |key, value|
        query_list.include?(key.to_sym)
      }
    end
  end
end
