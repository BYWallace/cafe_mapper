class MapController < ApplicationController

  def index
  end

  def search
    coordinates = { latitude: params[:lat], longitude: params[:lng] }
    parameters = { term: "coffee", limit: 10 }
    render json: Yelp.client.search_by_coordinates(coordinates, parameters)
  end
end
