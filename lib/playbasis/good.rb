module Playbasis
  class Good < Model
    def all
      http_get('/Goods')
    end

    def get(id)
      http_get("/Goods/#{id}")
    end
  end
end
