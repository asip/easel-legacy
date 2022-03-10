class User::ImageUploader < Shrine
  Attacher.derivatives do |original|
    magick = ImageProcessing::MiniMagick.source(original)

    {
      thumbnail: magick.resize_to_limit!(20, 20)
      one: magick.resize_to_limit!(100, 100)
    }
  end

  Attacher.validate do
    validate_max_size 5 * 1024 * 1024, message: "は 5MB を超えるとアップロードできません。"
    # validate_min_size 1, message: 'ファイルを選択してください。'
    validate_mime_type %w[image/jpg image/jpeg image/png], message: "は JPEG/PNG のみアップロードできます。"
  end
end