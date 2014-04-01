ActiveAdmin.register Blog do

  permit_params :title, :body

  index do
    column :title
    column :created_at
    column :updated_at
    default_actions
  end

  filter :title
  #
  # permit_params :list, :of, :attributes, :on, :model
  #
  # or
  #
  # permit_params do
  #  permitted = [:permitted, :attributes]
  #  permitted << :other if resource.something?
  #  permitted
  # end
  
end
