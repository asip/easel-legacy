# frozen_string_literal: true

# form
module Form
  # toast
  module TagEditor
    # Component class
    class Component < ViewComponent::Base
      def initialize(form:, tag_list:)
        @form = form
        @tag_list = tag_list
      end
    end
  end
end
