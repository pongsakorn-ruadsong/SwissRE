module Playbasis
  class Quiz < Model
    def all(tags)
      http_get('/Quiz/list',{query_params: {tags:tags}})
    end

    def recent(id)
        http_get("Quiz/player/#{id}/1")
    end

    def get(id)
      http_get("/Quiz/#{id}/detail")
    end
  end
end
