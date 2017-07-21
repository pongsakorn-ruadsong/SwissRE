module Api
  class QuestionsController < ApplicationController
    def answer
    	result = client.questions.answer(params[:id], params[:player_id], params[:token], params[:question_id], params[:option_id], params[:answer] ? params[:answer] : nil)
    	if result[:body]['success'] == false
    		result = { message: result[:body]['message'] }
    	else
    		result = result[:body]['response']['result']
    	end
    	render json: result
    end
  end
end
