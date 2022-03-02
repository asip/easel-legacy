Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "dashboard#show"

  get "/frames/" => "frames#index", :as => :frames
  resources :users, except: [:index]
  resources :frames do
    get :next, on: :collection
    get :prev, on: :collection
  end

  get "/signup" => "users#new", :as => "signup"
  resources :sessions, only: [:new, :create, :destroy]
  get "/login" => "sessions#new", :as => "login"
  get "/profile" => "sessions#show", :as => "profile"
  delete "/logout" => "sessions#destroy", :as => "logout"

  namespace :api do
    namespace :v1 do
      # get '/frames/:frame_id/comments' => 'comments#index'
      # post '/frames/:frame_id/comments' => 'comments#create'
      # delete '/comments/:id' => 'comments#destroy'
      resources :frames, only: [] do
        resources :comments, only: [:index, :create]
      end
      resources :comments, only: [:destroy]

      get "/account" => "account#show"
    end
  end
end
