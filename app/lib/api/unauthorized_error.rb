# frozen_string_literal: true

# api
module Api
  # Custom error class for unauthorized access (未認証アクセス用のカスタムエラークラス)
  class UnauthorizedError < StandardError
    def initialize(message = "Authentication information is invalid.")
      super(message)
    end
  end
end
