Rails.application.config.assets.paths << Rails.root.join("app", "assets", "builds")
Rails.application.config.assets.paths << Rails.root.join("node_modules")
Rails.application.config.assets.paths << Rails.root.join("node_modules/bootstrap-icons/font")