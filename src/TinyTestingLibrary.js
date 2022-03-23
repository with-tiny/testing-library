import test from './TinyTest.js'
import expect from './TinyExpect.js'
import * as mock from './TinyMock.js'

global.test = test
global.expect = expect
global.fn = mock.fn
global.spyOn = mock.spyOn
global.mock = mock.mock
global.mockReset = mock.mockReset
