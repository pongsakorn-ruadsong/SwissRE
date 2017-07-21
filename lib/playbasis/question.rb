module Playbasis
  class Question < Model
  	COMPONENT = {
			ADDRESS: 'ADDRESS',
			BIRTHDAY: 'BIRTHDAY',
			SC: 'SC',
			SCAS: 'SCAS',
			SLIDER: 'SLIDER',
			BINARY: 'BINARY',
			ERROR: 'ERROR'
  	}

    def get(quiz_id, player_id)
      http_get("Quiz/#{quiz_id}/question", { query_params: { player_id: player_id, random: 2 } })
    end

    def answer(quiz_id, player_id, token, question_id, option_id, answer)
    	http_post("Quiz/#{quiz_id}/answer", {
        player_id: player_id,
        token: access_token,
        question_id: question_id,
        option_id: option_id,
        answer: answer
      })
    end
  end
end
