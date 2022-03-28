Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :dishes
      resources :recipes, only: [:index, :show]
      resources :pantries
      resources :kitchens, only: [:index, :create]
      resources :ingredients, only: [:index, :show]
      resources :stores, only: [:index, :show]
      resources :users, only: [:update]
      post '/signup', to: 'users#create'
      get '/me', to: 'users#show'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  # Defines the root path route ("/")
  # root "articles#index"
end
