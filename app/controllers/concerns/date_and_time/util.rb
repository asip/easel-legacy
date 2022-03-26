# frozen_string_literal: true

# Date and Time Module
module DateAndTime
  # Utility Module
  module Util
    extend ActiveSupport::Concern

    # Class Methods
    module ClassMethods
      def date_valid?(str)
        !!Date.parse(str)
      rescue StandardError
        false
      end
    end
  end
end
