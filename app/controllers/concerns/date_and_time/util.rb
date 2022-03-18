module DateAndTime
  module Util
    extend ActiveSupport::Concern

    module ClassMethods
      def date_valid?(str)
        !!Date.parse(str)
      rescue
        false
      end
    end
  end
end
