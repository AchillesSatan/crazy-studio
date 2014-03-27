# Be sure to restart your server when you modify this file.

# CrazyStudio::Application.config.session_store :cookie_store, key: '_crazy-studio_session'

params = {
  key: "_crazy-studio_session_",
  cookie_only: false,
  timeout: 1.5,
  memcache_server: Setty.base.session_memcache_server,
  expire_after: 1.hour,
  namespace: "crazy-studio-#{Rails.env}"
}

# CrazyStudio::Application.config.session_store ActionDispatch::Session::CacheStore
# CrazyStudio::Application.config.session_options = params
