module Api
  class QuizzesController < ApplicationController
    def index
    	result = client.quizzes.all(params[:tags])
    	result = result[:body]['response']['result']
      render json: result
    end


		def recent
			result = client.quizzes.recent(params[:id])
    	result = result[:body]['response']['result']
      render json: result
		end

			def details
			result = client.quizzes.get(params[:id])
    	result = result[:body]['response']['result']
      render json: result
		end
		
		

    def question
    	result = client.questions.get(params[:id], params[:player_id])
    	result = result[:body]['response']['result']

			if !result.nil?
				question = result['question']
				component = Playbasis::Question::COMPONENT[:ERROR]
				if result['question'].include? "#"
					question_arr = result['question'].split('#')
					question = question_arr.last
					component = question_arr.first
				end

				json_data = {
					component: component,
					title: '',
					question_id: result['question_id'],
					question: question,
					question_image: result['question_image'],
					defaultValue: result['default_answer'],
					componentValue: {
						choices: []
					}
				}
				if result['options']
					result['options'].each do |option|
						json_data[:componentValue][:choices] << {
							id: option['option_id'],
							label: option['option'],
							value: option['option_id'],
							image: option['option_image'],
							range_interval: option['range_interval'],
							min: option['range_min'],
							max: option['range_max'],
							description: option['description'],
						}
					end
				end
			else
				json_data = {error: "no data"}
			end

    	render json: json_data
    end
  end
end
