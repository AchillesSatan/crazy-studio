module User::BlogModule
  extend ActiveSupport::Concern

  included do
    has_many :user_blogs, :dependent => :destroy
  end
    
  def user_blog(blog)
    self.user_blogs.find_or_create_by(blog_id: blog.id)
  end
end
