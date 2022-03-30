export type TestResult = null | 0 | 1
export type AnonymousFn = (...args: any[]) => any
export type ExecFn = () => void
export type HookFn = () => void

export interface Test {
  title: string
  ok: TestResult
  exec: ExecFn
}

export interface Describe {
  title: string
  tests: Test[]
  beforeAll: HookFn
  beforeEach: HookFn
  afterEach: HookFn
  afterAll: HookFn
  exec: ExecFn
}

export interface Suite {
  title: string
  describes: Describe[]
  exec: ExecFn
}

export type TestRun = Suite[]

export type SpiedObject = {
  [key: string]: any
  mockRestore: () => void
}
