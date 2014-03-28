module ApplicationHelper
  require "digest/md5"
  def gravatar(email, size = 48)
    gravatar_id = Digest::MD5.hexdigest(email.downcase)
    return "http://www.gravatar.com/avatar/#{gravatar_id}?s=#{size}&d=#{asset_path("ninja-avatar-48x48.png")}"
  end
end
