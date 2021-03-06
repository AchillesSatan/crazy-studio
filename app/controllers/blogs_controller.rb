class BlogsController < ApplicationController
  before_action :set_blog, only: [:show, :edit, :update, :destroy]
  before_action :has_auth?, only: [:create]
  skip_before_action :verify_authenticity_token, only: [:create, :update]

  # GET /blogs
  # GET /blogs.json
  def index
    @blogs = Blog.paginate(:page => params[:page], :per_page => 10).order(created_at: :desc)
  end

  # GET /home
  # GET /home.json
  def home
    @blogs = Blog.all.order(created_at: :desc).limit(10).includes(:user_blog => {:user => []}, :section => [])
    @sections = Section.all.order(name: :asc)
  end

  # GET /blogs/1
  # GET /blogs/1.json
  def show
  end

  # GET /blogs/new
  def new
    @blog = Blog.new
  end

  # GET /blogs/1/edit
  def edit
    @section = @blog.section
  end

  # POST /blogs
  # POST /blogs.json
  def create
    ActiveRecord::Base.transaction do
      if section_params[:name].empty?
        @section = nil
        @blog = Blog.new(title: blog_params[:title], body: blog_params[:body], tag_list: blog_params[:tag_list])
      else
        @section = Section.find_or_create_by(name: section_params[:name])
        @blog = @section.blogs.build(title: blog_params[:title], body: blog_params[:body], tag_list: blog_params[:tag_list])
      end

      respond_to do |format|
        if @blog.save!
          current_user.user_blog(@blog)
          unless @section.nil?
            current_user.user_section(@section)
          end
          format.html { redirect_to @blog, notice: 'Blog was successfully created.' }
          format.json { render action: 'show', status: :created, location: @blog }
        else
          format.html { render action: 'new' }
          format.json { render json: @blog.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # PATCH/PUT /blogs/1
  # PATCH/PUT /blogs/1.json
  def update
    respond_to do |format|
      if @blog.update(blog_params)
        if section_params[:name].empty?
          unless @blog.section_id.nil?
            @blog.update(section_id: nil)
          end
        else
          section = Section.find_or_create_by(name: section_params[:name])
          @blog.update(section_id: section.id)
        end

        format.html { redirect_to @blog, notice: 'Blog was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @blog.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /blogs/1
  # DELETE /blogs/1.json
  def destroy
    @blog.destroy
    respond_to do |format|
      format.html { redirect_to blogs_url }
      format.json { head :no_content }
    end
  end

  def tags
    query = params[:q]
    @tags = ActsAsTaggableOn::Tag.where('tags.name like ?', "%#{query}%")

    if @tags.empty?
      return render :json => [{id: "#{query}", name: "New: \"#{query}\""}]
    else
      render :json => @tags.map{|t| {:id => t.name, :name => t.name }}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_blog
      @blog = Blog.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def blog_params
      params.require(:blog).permit(:title, :body, :tag_list)
    end

    def section_params
      params.require(:section).permit(:name)
    end

    def has_auth?
      if current_user.nil?
        return redirect_to root_path
      end
    end
end
