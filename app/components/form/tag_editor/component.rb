# frozen_string_literal: true

# Form::TagEditor::Component class
class Form::TagEditor::Component < ViewComponent::Base
  def initialize(form:, tag_list:)
    @form = form
    @tag_list = tag_list
  end
end
