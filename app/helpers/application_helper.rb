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
end
