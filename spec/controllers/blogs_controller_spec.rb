require 'spec_helper'

describe BlogsController do

  describe "GET 'index'" do
    it "returns http success" do
      get 'index'
      response.should be_success
    end
  end

  describe "POST 'create' without authenticate" do
    it "redirect to root" do
      post 'create', @params = { blog: FactoryGirl.attributes_for(:blog), section: FactoryGirl.attributes_for(:section)}
      response.should redirect_to(root_path)
    end
  end

  describe "POST 'create' with authenticate" do
    it "returns index" do
      @user = FactoryGirl.create(:user)
      sign_in @user
      post 'create' ,@params = { blog: FactoryGirl.attributes_for(:blog), section: FactoryGirl.attributes_for(:section)}
      response.should redirect_to(:action => 'show', :id => Blog.last.id)
    end
  end
end