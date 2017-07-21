module Playbasis
  class Request
    def initialize(config)
      @config = config
    end

    def call(method, uri:, body: nil, query_params: nil, token: nil,
             auth: true, conn: new_conn, content_type: nil)

      options = { uri: uri, conn: conn }
      options[:body] = body if body
      if auth && token
        options[:body] ||= {}
        options[:body][:token] = token
      end
      options[:query_params] = query_params if query_params
      options[:content_type] = content_type if content_type

      resp = send(method, options)

      begin
        { status: resp.status, body: JSON.parse(resp.body) }
      rescue JSON::ParserError
        { status: resp.status, body: {} }
      end
    end

    def get(uri:, query_params: nil, conn: new_conn)
      conn.get do |req|
        req.url uri
        req.params = query_params if query_params
      end
    end

    def post(uri:, body:, conn: new_conn, content_type: nil)
      content_type ||= 'application/x-www-form-urlencoded' #'application/json'

      conn.post do |req|
        req.url uri
        req.headers['Content-Type'] = content_type
        req.body = content_type == 'application/json' ? body.to_json : body
      end
    end

    private

    def new_conn
      @conn = Faraday.new(url: @config.base_url)
    end
  end
end
