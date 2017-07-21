module Playbasis
  class Auth < Model
    def auth
      request.call(:post,
        uri: "/Auth",
        body: {
          api_key: @config.api_key,
          api_secret: @config.api_secret
        })
    end
  end
end
