module Api
  class GoodsController < ApplicationController

    def all
			result = client.goods.all()
    	result = result[:body]['response']['goods_list']
      render json: result
    end

			def details
			result = client.goods.get(params[:id])
    	result = result[:body]['response']['goods']
      render json: result
		end
		
  end
end
