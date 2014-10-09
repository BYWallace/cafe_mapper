class MapController < ApplicationController

  def index
  end

  def search
    parameters = { term: "coffee", limit: 10 }
    render json: Yelp.client.search("Washington DC", parameters)
  end
end
