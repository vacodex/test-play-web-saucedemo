// report.js
const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html',
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest'
    },
    device: 'Local test machine',
    platform: {
      name: 'macOS',
      version: 'Sonoma'
    }
  },
  customData: {
    title: 'Playwright + Cucumber Report',
    data: [
      { label: 'Proyecto', value: 'Sauce Demo Web' },
      { label: 'Ejecución', value: new Date().toLocaleString() }
    ]
  }
});
