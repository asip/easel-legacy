
# frozen_string_literal: true

# Api::Account::Authentication module
module Api::Account::Authentication
  extend ActiveSupport::Concern

  included do
    attr_reader :current_user

    before_action :authenticate
  end

  protected

  def current_user=(user)
    @current_user = user
  end

  # Authenticate the user based on the Authorization header (Authorizationヘッダーに基づいてユーザーを認証します。)
  def authenticate
    ## Check for the existence and format of the Authorization header.
    ## (Authorizationヘッダーの存在とフォーマットをチェック)
    # authorization_header = request.headers["Authorization"]
    ## An error occurs if the header is missing or does not start with "Bearer ".
    ## (ヘッダーがない、または "Bearer " で始まっていない場合はエラー)
    # unless authorization_header&.start_with?("Bearer ")
    #  raise Api::UnauthorizedError.new("Authorizationヘッダーがないか、形式が不正です。「Bearer [トークン]」の形式を期待します。")
    # end

    ## Extract the token string
    ## (トークン文字列を抽出)
    # token = authorization_header.split(" ")[1]
    ## An error occurs if the token is empty. (トークンが空の場合はエラー)
    # unless token.present?
    #  raise Api::UnauthorizedError.new("Authorizationヘッダーからトークンが見つかりません。")
    # end

    token = access_token
    # puts "token:#{token}"

    # An error occurs if the token is empty.
    # (トークンが空の場合はエラー)
    unless token.present?
      raise Api::UnauthorizedError.new("Cookieからトークンが見つかりません。")
    end

    begin
      self.current_user = User.find_from(token:)
      ## Assign a token to the current_user. (current_userにトークンを割り当てる)
      # current_user.token = token

    rescue ActiveRecord::RecordNotFound
      # If the user ID in the token does not correspond to an existing user
      # (トークン内のユーザーIDが既存のユーザーに対応しない場合)
      raise Api::UnauthorizedError.new("提供されたトークンに対応するユーザーが見つかりません。")
    rescue JWT::ExpiredSignature
      # If the token's 'exp' (expiration) claim indicates that it has expired
      # (トークンの 'exp' (有効期限) クレームが期限切れを示している場合)
      raise Api::UnauthorizedError.new("認証トークンの有効期限が切れています。")
    rescue JWT::DecodeError => error
      # General JWT decoding failure (e.g., invalid signature, malformed token structure)
      # (一般的なJWTデコード失敗 (例: 無効な署名、不正なトークン構造))
      Api::Account::Authentication.error_log("JWT Decode Error: #{error.message}")
      raise Api::UnauthorizedError.new("認証トークンが無効です。")
    rescue => exception
      # Catch other unexpected errors during the authentication process.
      # (認証プロセス中のその他の予期せぬエラーを捕捉)
      Api::Account::Authentication.error_log("JWT処理中に予期せぬ認証エラーが発生しました: #{exception.message}")
      raise Api::UnauthorizedError.new("認証中に予期せぬエラーが発生しました。")
    end
  end

  def self.error_log(str)
    Rails.logger.error(str)
  end
end
