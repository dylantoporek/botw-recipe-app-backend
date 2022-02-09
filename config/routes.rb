Rails.application.routes.draw do
  resources :recipe_lists
  resources :recipes
  resources :pantries
  resources :kitchens
  resources :ingredients
  resources :stores
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
