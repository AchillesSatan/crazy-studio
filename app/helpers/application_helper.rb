module ApplicationHelper

  require "digest/md5"

  def gravatar(email, size = 48, default_url = "&d=https://dashboard.heroku.com/ninja-avatar-48x48.png")
    gravatar_id = Digest::MD5.hexdigest(email.downcase)
    return "http://www.gravatar.com/avatar/#{gravatar_id}?s=#{size}#{default_url}"
  end

  def safe_render(options = {}, locals = {}, &block)
    begin
      render options, locals, &block
    rescue => exception
      Raven.capture_exception(exception)
      logger.info exception.inspect
      logger.info exception.backtrace.grep(/^((?!\/gems\/).)*$/).join("\n")
      nil
    end
  end

  def will_paginate_bootstrap(collection, options = {} )
    options[:renderer] ||= BootstrapPaginationHelper::LinkRenderer
    options[:class] ||= 'pagination pagination-centered'
    options[:inner_window] ||= 2
    options[:outer_window] ||= 1
    will_paginate(collection, options)
  end
end
