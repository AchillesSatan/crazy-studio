class SectionsController < ApplicationController
  before_action :set_section, only: [:show]

  def show
    @blogs = @section.blogs
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_section
    @section = Section.find(params[:id])
  end
end
