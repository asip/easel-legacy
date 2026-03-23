# frozen_string_literal: true

# tag api controller
class Api::V1::TagsController < Api::V1::ApiController
  include Api::Account::Authentication::Skip

  def search
    tags = Queries::ApplicationTag::ListTagNames.run(name: route_params[:q]).pluck(:name)
    render_tags(tags:)
  end

  private

  def render_tags(tags:)
    render json: { tags: }
  end

  def route_params
    @route_params ||= params.permit(:q).to_h
  end
end
