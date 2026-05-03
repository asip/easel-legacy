# frozen_string_literal: true

# ErrorMap Resource
class ErrorMapResource < ApplicationResource
  attributes :errors

  typelize errors: "Record<string, string[]>"
end
