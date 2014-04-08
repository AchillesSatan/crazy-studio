module User::SectionModule
  extend ActiveSupport::Concern

  included do
    has_many :user_sections, :dependent => :destroy
  end
    
  def user_section(section)
    self.user_sections.find_or_create_by(section_id: section.id)
  end
end
