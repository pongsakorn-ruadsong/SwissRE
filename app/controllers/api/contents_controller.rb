module Api
  class ContentsController < ApplicationController
    def index
      render json: client.contents.all
    end
  end
end
