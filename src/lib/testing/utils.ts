import { TestCategory } from './checklist'

export function generateTestReport(categories: TestCategory[]) {
  let report = '# Test Report\n\n'

  for (const category of categories) {
    report += `## ${category.name}\n\n`
    report += `${category.description}\n\n`

    const tests = category.tests
    const total = tests.length
    const passed = tests.filter(t => t.status === 'passed').length
    const failed = tests.filter(t => t.status === 'failed').length
    const pending = tests.filter(t => t.status === 'pending').length
    const blocked = tests.filter(t => t.status === 'blocked').length

    report += `**Summary:**\n`
    report += `- Total Tests: ${total}\n`
    report += `- Passed: ${passed}\n`
    report += `- Failed: ${failed}\n`
    report += `- Pending: ${pending}\n`
    report += `- Blocked: ${blocked}\n\n`

    report += `### Test Cases\n\n`
    for (const test of tests) {
      report += `#### ${test.id}: ${test.description}\n`
      report += `- Priority: ${test.priority.toUpperCase()}\n`
      report += `- Status: ${test.status.toUpperCase()}\n`
      report += `- Steps:\n${test.steps.map(step => `  1. ${step}`).join('\n')}\n`
      report += `- Expected Result: ${test.expectedResult}\n`
      if (test.actualResult) {
        report += `- Actual Result: ${test.actualResult}\n`
      }
      if (test.notes) {
        report += `- Notes: ${test.notes}\n`
      }
      report += '\n'
    }
  }

  return report
}