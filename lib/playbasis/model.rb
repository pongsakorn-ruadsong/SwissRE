module Playbasis
  class Model
    def initialize(config)
      @config = config
    end

    protected

    def http_get(uri, opts = { query_params: {} })
      request.call(:get, uri: uri, query_params: {
        api_key: @config.api_key,
        api_secret: @config.api_secret,
      }.merge(opts[:query_params]))
    end

    def http_post(uri, body)
      request.call(:post, uri: uri, body: body)
    end

    private

    def access_token
      @access_token ||= Playbasis::AccessToken.new(@config).get
    end

    def request
      Request.new(@config)
    end
  end
end
