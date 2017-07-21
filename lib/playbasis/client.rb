module Playbasis
  class Client
    attr_reader :config

    RESOURCES = {
      auth: Auth,
      users: User,
      contents: Content,
      quizzes: Quiz,
      questions: Question,
      goods: Good
    }

    def initialize(options = nil)
      @config = load_config(options)
    end

    RESOURCES.each do |resource, klass|
      define_method resource do
        klass.new(@config)
      end
    end

    private

    def load_config(options)
      return Playbasis.configuration unless options

      config = Configuration.new
      config.merge(Playbasis.configuration.to_hash.merge(options))
      config
    end
  end
end
