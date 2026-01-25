# frozen_string_literal: true

# PageTransition::Query::Ref module
module PageTransition::Query::Ref
  extend ActiveSupport::Concern

  included do
    helper_method :query_map
    helper_method :back_to_path
  end

  protected

  def query_list
    %i[ref page]
  end

  def query_map
    @query_map ||= permitted_params.to_h.filter do |key, value|
      query_list.include?(key.to_sym) if value.present?
    end
  end

  def ref_items
    @ref_items ||= Json::Util.to_hash(ref)
  end

  def ref
    items = permitted_params[:ref]
    items.present? ? items : nil
  end

  def page
    permitted_params[:page]
  end

  def back_to_path
    @back_to_path ||= prev_url
  end
end
