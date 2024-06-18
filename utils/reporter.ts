import { Reporter, TestResult, TestStatus } from '@playwright/test/reporter';

class CustomReporter implements Reporter {
  private results: { testName: string, status: string }[] = [];

  onTestEnd(test, result): void {
    this.results.push({ testName: test.title, status: result.status });
  }

  onEnd(): void {
    this.generateReport();
  }

  private generateReport(): void {
    console.log('Test Report:');
    this.results.forEach(result => {
      console.log(`${result.testName}: ${result.status}`);
    });
  }
}

export default CustomReporter;