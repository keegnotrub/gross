Rails.application.routes.draw do
  root to: "pages#welcome"

  get 'about', to: 'pages#about'
end
