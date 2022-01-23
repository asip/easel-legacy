class ImageUploader < Shrine
  Attacher.derivatives do |original|
    magick = ImageProcessing::MiniMagick.source(original)

    {
      two: magick.resize_to_limit!(200, 200),
      three: magick.resize_to_limit!(300, 300)
    }
  end

  Attacher.validate do
    validate_max_size 5 * 1024 * 1024, message: 'は 5MB を超えるとアップロードできません。'
    # validate_min_size 1, message: 'ファイルを選択してください。'
    validate_mime_type %w[image/jpg image/jpeg image/png], message: 'は JPEG/PNG のみアップロードできます。'
  end
end