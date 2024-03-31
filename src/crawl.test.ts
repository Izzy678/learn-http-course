import {expect,test} from '@jest/globals'
import { normalizeUrl } from './craw'

test('normalizeUrl strip protocol',()=>{
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeUrl(input);
  const expected = 'blog.boot.dev/path';
  expect(actual ).toEqual(expected)
})


test('normalizeUrl strip trailing slash',()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual ).toEqual(expected)
  })

  
test('normalizeUrl capitals',()=>{
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual ).toEqual(expected)
  })

  test('normalizeUrl STRIO HTTPS',()=>{
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual ).toEqual(expected)
  })