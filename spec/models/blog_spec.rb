require 'spec_helper'

describe Blog do
  # pending "add some examples to (or delete) #{__FILE__}"
  include_context "create blogs"

  before do
    FactoryGirl.create(:blog)
  end

  describe "" do
    it "create a blog" do
      new_blog = Blog.create(title: blog.title, id: blog.body)
      new_blog.should_not be_nil
    end

    it "show a blog" do
      m_blog = Blog.where(title: blog.title).first
      m_blog.body.should == blog.body
    end
  end
end
