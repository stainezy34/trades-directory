import { z } from 'zod'

// Test status types
export const TestStatus = {
  PASSED: 'passed',
  FAILED: 'failed',
  PENDING: 'pending',
  BLOCKED: 'blocked'
} as const

// Test priority levels
export const TestPriority = {
  P0: 'p0', // Critical path, must work
  P1: 'p1', // Important functionality
  P2: 'p2', // Nice to have
} as const

// Test category schema
export const testCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  tests: z.array(z.object({
    id: z.string(),
    description: z.string(),
    priority: z.enum(['p0', 'p1', 'p2']),
    status: z.enum(['passed', 'failed', 'pending', 'blocked']),
    steps: z.array(z.string()),
    expectedResult: z.string(),
    actualResult: z.string().optional(),
    notes: z.string().optional()
  }))
})

export type TestCategory = z.infer<typeof testCategorySchema>

// Test categories
export const testCategories: TestCategory[] = [
  {
    name: 'Authentication',
    description: 'User authentication and authorization tests',
    tests: [
      {
        id: 'AUTH-001',
        description: 'User sign up with valid credentials',
        priority: 'p0',
        status: 'pending',
        steps: [
          'Navigate to /signup',
          'Enter valid email and password',
          'Submit form'
        ],
        expectedResult: 'User account is created and user is redirected to dashboard'
      },
      {
        id: 'AUTH-002',
        description: 'User sign in with valid credentials',
        priority: 'p0',
        status: 'pending',
        steps: [
          'Navigate to /signin',
          'Enter valid credentials',
          'Submit form'
        ],
        expectedResult: 'User is authenticated and redirected to dashboard'
      },
      {
        id: 'AUTH-003',
        description: 'Password reset functionality',
        priority: 'p1',
        status: 'pending',
        steps: [
          'Navigate to /reset-password',
          'Enter registered email',
          'Submit form'
        ],
        expectedResult: 'Password reset email is sent'
      }
    ]
  },
  {
    name: 'Navigation',
    description: 'Site navigation and routing tests',
    tests: [
      {
        id: 'NAV-001',
        description: 'Protected route access',
        priority: 'p0',
        status: 'pending',
        steps: [
          'Attempt to access /profile without authentication',
          'Verify redirect to /signin',
          'Sign in and try again'
        ],
        expectedResult: 'Unauthenticated users are redirected to sign in'
      },
      {
        id: 'NAV-002',
        description: '404 page for invalid routes',
        priority: 'p1',
        status: 'pending',
        steps: [
          'Navigate to non-existent route',
          'Verify 404 page display'
        ],
        expectedResult: 'Custom 404 page is displayed'
      }
    ]
  },
  {
    name: 'Trades List',
    description: 'Tradesperson listing and filtering tests',
    tests: [
      {
        id: 'TRADE-001',
        description: 'Display trades with correct information',
        priority: 'p0',
        status: 'pending',
        steps: [
          'Navigate to /trades',
          'Verify trade cards display',
          'Check information accuracy'
        ],
        expectedResult: 'Trades are displayed with correct details'
      },
      {
        id: 'TRADE-002',
        description: 'Filter trades by type',
        priority: 'p1',
        status: 'pending',
        steps: [
          'Select trade type filter',
          'Verify filtered results'
        ],
        expectedResult: 'Only trades of selected type are displayed'
      }
    ]
  },
  {
    name: 'Project Management',
    description: 'Project creation and bidding tests',
    tests: [
      {
        id: 'PROJ-001',
        description: 'Create new project',
        priority: 'p0',
        status: 'pending',
        steps: [
          'Navigate to project creation',
          'Fill in project details',
          'Submit form'
        ],
        expectedResult: 'New project is created and displayed'
      },
      {
        id: 'PROJ-002',
        description: 'Submit bid on project',
        priority: 'p0',
        status: 'pending',
        steps: [
          'View project details',
          'Submit bid with proposal',
          'Verify bid submission'
        ],
        expectedResult: 'Bid is submitted and visible to project owner'
      }
    ]
  },
  {
    name: 'Messaging',
    description: 'User messaging system tests',
    tests: [
      {
        id: 'MSG-001',
        description: 'Send message to tradesperson',
        priority: 'p1',
        status: 'pending',
        steps: [
          'Navigate to messaging interface',
          'Compose and send message',
          'Verify delivery'
        ],
        expectedResult: 'Message is sent and displayed in conversation'
      },
      {
        id: 'MSG-002',
        description: 'Real-time message updates',
        priority: 'p1',
        status: 'pending',
        steps: [
          'Open conversation in two browsers',
          'Send message from one browser',
          'Verify real-time update in other browser'
        ],
        expectedResult: 'Messages appear in real-time without refresh'
      }
    ]
  },
  {
    name: 'Reviews',
    description: 'Review submission and display tests',
    tests: [
      {
        id: 'REV-001',
        description: 'Submit review for completed project',
        priority: 'p1',
        status: 'pending',
        steps: [
          'Complete project',
          'Navigate to review submission',
          'Submit review with rating'
        ],
        expectedResult: 'Review is submitted and displayed on profile'
      },
      {
        id: 'REV-002',
        description: 'Review validation',
        priority: 'p1',
        status: 'pending',
        steps: [
          'Attempt to submit invalid review',
          'Verify validation messages'
        ],
        expectedResult: 'Invalid reviews are prevented with clear messages'
      }
    ]
  },
  {
    name: 'Performance',
    description: 'Site performance and loading tests',
    tests: [
      {
        id: 'PERF-001',
        description: 'Initial page load time',
        priority: 'p1',
        status: 'pending',
        steps: [
          'Clear cache',
          'Load homepage',
          'Measure load time'
        ],
        expectedResult: 'Page loads within 3 seconds'
      },
      {
        id: 'PERF-002',
        description: 'Image optimization',
        priority: 'p2',
        status: 'pending',
        steps: [
          'Check image loading',
          'Verify lazy loading',
          'Check image sizes'
        ],
        expectedResult: 'Images are optimized and lazy loaded'
      }
    ]
  },
  {
    name: 'Security',
    description: 'Security and data protection tests',
    tests: [
      {
        id: 'SEC-001',
        description: 'CSRF protection',
        priority: 'p0',
        status: 'pending',
        steps: [
          'Attempt form submission without CSRF token',
          'Verify request rejection'
        ],
        expectedResult: 'Requests without valid CSRF tokens are rejected'
      },
      {
        id: 'SEC-002',
        description: 'XSS prevention',
        priority: 'p0',
        status: 'pending',
        steps: [
          'Attempt to inject script in inputs',
          'Verify script sanitization'
        ],
        expectedResult: 'Script injection attempts are sanitized'
      }
    ]
  }
]