
# frozen_string_literal: true

# api/Authentication module
module Api::Authentication
  extend ActiveSupport::Concern

  included do
    attr_accessor :current_user

    before_action :authenticate
  end

  protected

  # (Authorizationヘッダーに基づいてユーザーを認証します。)
  def authenticate
    ## (Authorizationヘッダーの存在とフォーマットをチェック)
    # authorization_header = request.headers["Authorization"]
    ## (ヘッダーがない、または "Bearer " で始まっていない場合はエラー)
    # unless authorization_header&.start_with?("Bearer ")
    #  raise Api::ErrorRenderable::UnauthorizedError.new("Authorizationヘッダーがないか、形式が不正です。「Bearer [トークン]」の形式を期待します。")
    # end

    ## (トークン文字列を抽出)
    # token = authorization_header.split(" ")[1]
    ## (トークンが空の場合はエラー)
    # unless token.present?
    #  raise Api::ErrorRenderable::UnauthorizedError.new("Authorizationヘッダーからトークンが見つかりません。")
    # end

    token = cookies[:access_token]

    begin
      self.current_user = User.find_from(token:)
      # (current_user にトークンを割り当てる)
      current_user.assign_token(token)

    rescue ActiveRecord::RecordNotFound
      # (トークン内のユーザーIDが既存のユーザーに対応しない場合)
      raise Api::ErrorRenderable::UnauthorizedError.new("提供されたトークンに対応するユーザーが見つかりません。")
    rescue JWT::ExpiredSignature
      # (トークンの 'exp' (有効期限) クレームが期限切れを示している場合)
      raise Api::ErrorRenderable::UnauthorizedError.new("認証トークンの有効期限が切れています。")
    rescue JWT::DecodeError => e
      # (一般的なJWTデコード失敗 (例: 無効な署名、不正なトークン構造))
      Rails.logger.error("JWT Decode Error: #{e.message}")
      raise Api::ErrorRenderable::UnauthorizedError.new("認証トークンが無効です。")
    rescue => e
      # (認証プロセス中のその他の予期せぬエラーを捕捉)
      Rails.logger.error("JWT処理中に予期せぬ認証エラーが発生しました: #{e.message}")
      raise Api::ErrorRenderable::UnauthorizedError.new("認証中に予期せぬエラーが発生しました。")
    end
  end
end
