using Microsoft.Extensions.Logging;

namespace ProjectC.Helper
{
    public class Logger<T>
    {
        private readonly ILogger _logger;
        private static Logger<T> _instance;

        private Logger(ILogger baseLogger)
        {
            _logger = baseLogger;
        }

        public static Logger<T> Get(ILogger<T> baseLogger)
        {
            return new Logger<T>(baseLogger);
        }

        public void Info(string message)
        {
            _logger.LogInformation(message);
        }

        public void Info(string message, params object[] parameters)
        {
            _logger.LogInformation(message, parameters);
        }

        public void Debug(string message)
        {
            _logger.LogDebug(message);
        }

        public void Debug(string message, params object[] parameters)
        {
            _logger.LogDebug(message, parameters);
        }

        public void Error(string message)
        {
            _logger.LogError(message);
        }

        public void Error(string message, params object[] parameters)
        {
            _logger.LogError(message, parameters);
        }
    }
}
