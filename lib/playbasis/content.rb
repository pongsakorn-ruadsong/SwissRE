module Playbasis
  class Content < Model
    def all(language = 'English')
      http_get("/Content?language=#{language}")
    end
  end
end
