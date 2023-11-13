# frozen_string_literal: true

# toast
module Toast
  # Component
  class Component < ViewComponent::Base
    def initialize(flashes: {}, flash: {})
      super
      @flashes = flashes
      @flash = flash
      @flashes_json = flashes.to_json
      @flash_json = flash_to_json
    end

    private

    def flash_to_json
      flash_ = {}
      @flash.each  do |key, value|
        flash_[key] = [value]
      end
      flash_.to_json
    end
  end
end
