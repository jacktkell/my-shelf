Rails.application.routes.draw do
  resources :users, only: [:index, :create, :show, :update]
  resources :books, only: [:index, :show]
  resources :shelves, only: [:index, :create, :destroy]
  resources :reviews, only: [:index, :create]
  resources :login, only: [:create]
  resources :ratings, only: [:index, :create]
  delete "/logout", to: "login#destroy"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end