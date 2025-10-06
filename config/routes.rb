# frozen_string_literal: true

# rubocop: disable Metrics/BlockLength
Rails.application.routes.draw do
  devise_for :admins, format: :html,
    controllers: {
      sessions: "admins/sessions"
    }
  devise_scope :admin do
    get "admins/sign_in" => "admins/sessions#new"
    post "sessions/admin" => "admins/sessions#create"
  end

  mount RailsAdmin::Engine => "/admin", as: "rails_admin"

  devise_for :users, path: "",
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
    post "oauth/callback", to: "users/omniauth_callbacks#google_oauth2"
    get "oauth/callback", to: "users/omniauth_callbacks#google_oauth2"
    get "/signup", to: "users/registrations#new", as: :signup
    get "/profile/edit" => "users/registrations#edit", as: "edit_profile"
    delete "/account", to: "users/registrations#destroy", as: "delete_account"
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "frames#index"

  resources :users, except: [ :index ] do
    resource :follow_relationships, only: %i[create destroy]
    get "followees" => "users#followees", as: "followees"
    get "followers" => "users#followers", as: "followers"
  end
  resources :frames, except: [ :index ] do
    get :next, on: :collection
    get :prev, on: :collection
  end

  namespace :account do
    resource :password
  end

  get "/profile" => "sessions#show", as: "profile"

  namespace :api do
    namespace :front do
      namespace :v1 do
        resources :frames, only: [] do
          get "/comments" => "/api/front/v1/frames#comments"
          resources :comments, only: %i[create update]
        end
        resources :comments, only: [ :destroy ]

        get "/account" => "/api/front/v1/account#show"
      end
    end
  end
end
# rubocop: enable Metrics/BlockLength
