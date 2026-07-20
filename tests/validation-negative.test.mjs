import test from 'node:test';
import assert from 'node:assert/strict';

import { compareAcmOutput, compareResult } from '../js/compare.js';
import { runJavascriptCore } from '../tools/validation-runtime.mjs';
import groupAnagrams from '../problems/p049-group-anagrams.js';
import subsets from '../problems/p078-subsets.js';
import copyRandomList from '../problems/p138-copy-list-with-random-pointer.js';
import lowestCommonAncestor from '../problems/p236-lowest-common-ancestor-of-a-binary-tree.js';
import lruCache from '../problems/p146-lru-cache.js';

function passingCases(problem, code) {
  const run = runJavascriptCore(problem, code);
  assert.equal(run.compileError, undefined);
  return run.results.map((result, index) => result.ok
    && compareResult(problem.tests[index].expected, result.got, problem.compare, problem.numericTolerance || 0));
}

test('比较器递归忽略顺序但保留多重性，ACM 空行严格且容差必须显式开启', () => {
  assert.equal(compareResult([[1, 2], [3]], [[3], [2, 1]], 'nestedMultiset'), true);
  assert.equal(compareResult([[1, 1]], [[1]], 'nestedMultiset'), false);
  assert.equal(compareAcmOutput('\n1\n', '1\n'), false);
  assert.equal(compareAcmOutput('1.0\n', '1.0001\n'), false);
  assert.equal(compareAcmOutput('1.0\n', '1.0001\n', 0.001), true);
});

test('p138 直接 return head 会被深拷贝身份契约拒绝', () => {
  const run = runJavascriptCore(copyRandomList, 'var copyRandomList = function(head) { return head; };');
  assert.equal(run.compileError, undefined);
  assert.ok(run.results.some((result) => !result.ok && /全新节点|深拷贝/.test(result.error)));
  assert.ok(!passingCases(copyRandomList, 'var copyRandomList = function(head) { return head; };').every(Boolean));
});

test('p236 返回同值伪造节点会被输入树身份契约拒绝', () => {
  const code = 'var lowestCommonAncestor = function(root) { return { val: root.val, left: null, right: null }; };';
  const run = runJavascriptCore(lowestCommonAncestor, code);
  assert.ok(run.results.every((result) => !result.ok && /输入树中的节点对象/.test(result.error)));
});

test('p078 漏掉空集的实现不能通过', () => {
  const code = `var subsets = function(nums) {
    const out = [];
    for (let mask = 1; mask < (1 << nums.length); mask++) {
      const current = [];
      for (let i = 0; i < nums.length; i++) if (mask & (1 << i)) current.push(nums[i]);
      out.push(current);
    }
    return out;
  };`;
  assert.ok(passingCases(subsets, code).some((passed) => !passed));
});

test('p049 允许组间和组内重排，但错误分组仍不能通过', () => {
  const reordered = `var groupAnagrams = function(strs) {
    const groups = new Map();
    for (const word of strs) {
      const key = [...word].sort().join('');
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).unshift(word);
    }
    return [...groups.values()].reverse();
  };`;
  assert.ok(passingCases(groupAnagrams, reordered).every(Boolean));
  const wrong = 'var groupAnagrams = function(strs) { return [strs]; };';
  assert.ok(passingCases(groupAnagrams, wrong).some((passed) => !passed));
});

test('LRU 容量一与 get 刷新顺序边界会淘汰错误实现', () => {
  const noRefreshOnGet = `class LRUCache {
    constructor(capacity) { this.capacity = capacity; this.map = new Map(); }
    get(key) { return this.map.has(key) ? this.map.get(key) : -1; }
    put(key, value) {
      if (this.map.has(key)) this.map.delete(key);
      this.map.set(key, value);
      if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value);
    }
  }`;
  const cases = passingCases(lruCache, noRefreshOnGet);
  assert.ok(cases.some((passed) => !passed));
  assert.equal(cases[1], true, '容量为 1 的基础淘汰仍应被执行到');
});
