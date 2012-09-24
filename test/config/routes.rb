NumerousJs::Application.routes.draw do
  root :to => 'articles#new'
  
  resources :articles do
    resources :tags
  end
end
