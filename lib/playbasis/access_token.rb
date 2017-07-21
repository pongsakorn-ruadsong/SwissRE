module Playbasis
  class AccessToken
    attr_accessor :config, :storage

    def initialize(config)
      @config = config
      @storage = @config.storage
    end

    def get
      auth = storage['authentication']
      return auth['token'] if auth && Time.new(auth['date_expire']) > Time.now.to_i

      auth = Auth.new(@config).auth[:body]['response']
      storage['authentication'] = auth
      auth['token']
    end
  end
end
