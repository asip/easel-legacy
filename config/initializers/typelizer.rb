# Directories to search for serializers
Typelizer.dirs = [ Rails.root.join("app", "resources") ]

Typelizer.configure do |config|
  # config.associations_strategy = :active_record
  config.inheritance_strategy = :inheritance
  config.writer do |c|
    c.output_dir = "app/frontend/types/resource/serializers"
  end
end
