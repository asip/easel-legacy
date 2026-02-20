# frozen_string_literal: true

# tag api controller
class Front::Api::V1::TagsController < Front::Api::V1::ApiController
  include Api::Account::Authentication::Skip

  def search
    tags = Queries::ApplicationTag::ListTagNames.run(name: query_params[:q]).pluck(:name)
    render json: { tags: }
  end

  private

  def query_params
    @query_params ||= params.permit(:q).to_h
  end
end
