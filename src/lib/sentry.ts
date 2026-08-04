import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: __SENTRY_DSN__,
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
  // Alternatively, use `process.env.npm_package_version` for a dynamic release version
  // if your build tool supports it.
  release: `sentry-client@${__VERSION__}`,
  environment: __DEV__ ? "development" : "production",
  integrations: [
    Sentry.replayIntegration(), // 开启会话回放功能
    Sentry.browserTracingIntegration(), // 开启浏览器端跟踪功能
    Sentry.browserProfilingIntegration(), // 开启浏览器端性能分析功能
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  enableLogs: true, // 开启日志收集
  // Set profileSessionSampleRate to 1.0 to profile during every session.
  // The decision, whether to profile or not, is made once per session (when the SDK is initialized).
  profileSessionSampleRate: 1.0,
});

declare const FeedbackTool: any;

export const sentryFeedbackTool = new FeedbackTool();
sentryFeedbackTool.setupSentry(Sentry).init();

export const logger = {
  info: (...args: Parameters<typeof Sentry.logger.info>) => {
    Sentry.logger.info(...args);
  },
};

export const metrics = {
  count: (...args: Parameters<typeof Sentry.metrics.count>) => {
    Sentry.metrics.count(...args);
  },
  distribution: (...args: Parameters<typeof Sentry.metrics.distribution>) => {
    Sentry.metrics.distribution(...args);
  },
  gauge: (...args: Parameters<typeof Sentry.metrics.gauge>) => {
    Sentry.metrics.gauge(...args);
  },
};

export default Sentry;
