require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module CrazyStudio
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # とりあえず  
    # config.action_controller.allow_forgery_protection = false

    # config.cache_store = :dalli_store, Setty.base.cache_memcache_server, {namespace: "crazy-studio-#{Rails.env}"}

    config.action_mailer.default_url_options = { :host => 'localhost:3000' }

    config.assets.enabled = true

    config.assets.initialize_on_precompile = false

    config.assets.precompile += %w(active_admin.css active_admin/print.css active_admin.js)

    # client = Dalli::Client.new((ENV["MEMCACHIER_SERVERS"] || "").split(","),
    #                            :username => ENV["MEMCACHIER_USERNAME"],
    #                            :password => ENV["MEMCACHIER_PASSWORD"],
    #                            :failover => true,
    #                            :socket_timeout => 1.5,
    #                            :socket_failure_delay => 0.2,
    #                            :value_max_bytes => 10485760)
    # config.action_dispatch.rack_cache = {
    #   :metastore    => client,
    #   :entitystore  => client
    # }
    config.serve_static_assets = true
    # config.static_cache_control = "public, max-age=2592000"
    # config.assets.digest = true
    # config.action_controller.perform_caching = true

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    config.time_zone = 'Tokyo'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    config.i18n.load_path += Dir[Rails.root.join('config/locales', '*', '*.yml').to_s]

    config.paths["config/routes.rb"].concat(Dir[Rails.root.join("config/routes/*.rb")])

  end
end
