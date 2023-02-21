# frozen_string_literal: true

# Profile Module
module Profile
  # Image Module
  module Image
    # Uploader
    class Uploader < Shrine
      Attacher.derivatives do |original|
        magick = ImageProcessing::MiniMagick.source(original)

        {
          thumbnail: magick.resize_to_limit!(50, 50),
          one: magick.resize_to_limit!(100, 100),
          three: magick.resize_to_limit!(300, 300)
        }
      end

      Attacher.validate do
        validate_max_size 5 * 1024 * 1024, message: I18n.t('validations.message.user.image.max_size')
        # validate_min_size 1, message: I18n.t('validations.message.user.image.required')
        validate_mime_type %w[image/jpg image/jpeg image/png],
                           message: I18n.t('validations.message.user.image.mime_type')
      end
    end
  end
end
