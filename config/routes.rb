# frozen_string_literal: true

# rubocop: disable Metrics/BlockLength
Rails.application.routes.draw do
  devise_for :admins, format: :html,
    controllers: {
      sessions: "admins/sessions"
    }
  devise_scope :admin do
    get "admins/sign_in" => "admins/sessions#new", as: "admin_login"
    post "sessions/admin" => "admins/sessions#create"
    get "admins/sign_out" => "admins/sessions#destroy"
  end

  mount RailsAdmin::Engine => "/admin", as: "rails_admin"

  devise_for :users, format: :html,
    controllers: {
      sessions: "users/sessions",
      registrations: "users/registrations",
      omniauth_callbacks: "users/omniauth_callbacks"
    }
  # ,
  # path_names: {
  #   sign_in: "login",
  #   sign_out: "logout",
  #   registration: "signup"
  # }
  devise_scope :user do
    get "/login", to: "users/sessions#new", as: "login"
    post "/sessions/user", to: "users/sessions#create"
    delete "/account/logout", to: "users/sessions#destroy", as: "account_logout"
    post "oauth/callback", to: "users/omniauth_callbacks#google"
    get "oauth/callback", to: "users/omniauth_callbacks#google"
    get "/signup", to: "users/registrations#new", as: :signup
    get "/profile/edit" => "users/registrations#edit", as: "edit_profile"
    delete "/account", to: "users/registrations#destroy", as: "delete_account"
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "frames#index"

  resources :users, except: [ :index ] do
    resource :follower_relationships, only: %i[create destroy]
    member do
      get :next
      get :prev
      get :followees, as: "followees"
      get :followers, as: "followers"
    end
  end

  resources :frames, except: [ :index ] do
    collection do
      get :next
      get :prev
    end
  end

  namespace :account do
    resource :password, only: [ :show, :edit, :update ]
  end

  scope :profile do
    get "/" => "sessions#show", as: "profile"
    get "/next" => "sessions#next"
    get "/prev" => "sessions#prev"
  end

  namespace :front do
    namespace :api do
      namespace :v1 do
        resources :frames, only: [] do
          get :comments
          resources :comments, only: %i[create update destroy]
        end

        resources :tags, only: [] do
          collection do
            get :search
          end
        end

        get "/account" => "account#show"
      end
    end
  end
end
# rubocop: enable Metrics/BlockLength
