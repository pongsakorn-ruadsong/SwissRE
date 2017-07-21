module Playbasis
  class User < Model
    def register(id, email, first_name, last_name)
      request.call(:post,
        uri: "/Player/#{id}/register",
        body: {
          token: access_token,
          username: id,
          email: email,
          first_name: first_name,
          last_name: last_name
        }
      )
    end

    def login(id)
      request.call(:post,
        uri: "/Player/#{id}/login",
        body: {
          token: access_token,
          id: id
        }
      )
    end
  end
end
