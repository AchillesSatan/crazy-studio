class TagsController < ApplicationController
  before_action :set_tag, only: [:show]

  def show
    @blogs = Blog.by_join_date.tagged_with([@tag], :any => true)
  end

  private

  def set_tag
    @tag = params[:id]
  end
end
