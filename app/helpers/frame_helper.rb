module FrameHelper
  def query_params_hidden_field_tags
    params_query = query_params.to_h
    tags = params_query.map do |key, value|
      hidden_field_tag(key, value) if value.present?
    end 
    tags.join.html_safe
  end 
end
