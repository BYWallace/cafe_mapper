class MapController < ApplicationController

  def index
  end

  def search
    render json: Yelp.client.search("Washington DC")
  end
end
