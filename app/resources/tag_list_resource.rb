class TagListResource < ApplicationResource
  attributes :tags

  typelize tags: "string[]"
end
