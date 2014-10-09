Rails.application.routes.draw do
  root "map#index"
  post "/search" => "map#search"
end
