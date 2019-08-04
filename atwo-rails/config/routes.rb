Rails.application.routes.draw do
  root 'pages#home'

  mount ActionCable.server => '/cable'

  namespace :api do 
  	namespace :v1 do 
		  resources :examples, only: [:index]
		  resources :conversations, only: [:index, :create]
		  resources :messages, only: [:create]
	  end
  end
end
