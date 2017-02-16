import { expect } from 'chai';
import { Trie } from '../scripts/Trie.js';
const text = "/usr/share/dict/words"
const fs = require('fs');
let dictionary = fs.readFileSync(text, 'utf8').trim().split('\n')


describe('TDD with Trie', () => {

  it('should increase the count when a word is added', function () {
    let trie = new Trie ();
    expect(trie._length).to.deep.equal(0)
    console.log(trie._length);
    trie.insert('apple')
    expect(trie._length).to.deep.equal(1)
  })

  it('should set the zero wordArray index as this.head if this.head is null', function () {
    let trie = new Trie ();
    trie.insert('apple')
    expect(trie.head.children['a'].data).to.deep.equal('a')
  })

  it.skip('should set the first wordArray index to the children of this.head', function () {
    let trie = new Trie ();
    trie.insert('apple')
    expect(trie.head['a'].data).to.deep.equal('a')
    expect(trie.head['a'].children['p'].data).to.deep.equal('p')
  })

  it('should set the first wordArray index to the children of this.head', function () {
    let trie = new Trie ();
    trie.insert('world')
    trie.insert('word')
    trie.insert('worm')
    trie.insert('worry')
    trie.insert('can')
    // console.log(JSON.stringify(trie, null, 4))


    expect(trie._length).to.deep.equal(5)
  })

  it('should assign the completeWord value to the last index of the word', function () {
    let trie = new Trie ();
    trie.insert('world')
    expect(trie.head.children['w'].children['o'].children['r'].children['l'].completeWord).to.deep.equal(null)
    expect(trie.head.children['w'].children['o'].children['r'].children['l'].children['d'].completeWord).to.deep.equal('world')
  })

  it('suggest should return a list of words', function () {
    let trie = new Trie ();
    trie.insert('world')
    expect(trie.suggest('wor')).to.deep.equal(['world'])
  })

  it('suggest should return a list of words', function () {
    let trie = new Trie ();
    trie.insert('world')
    trie.insert('word')
    trie.insert('worm')
    trie.insert('worry')
    trie.insert('can')
    expect(trie.suggest('wor')).to.deep.equal(['world', 'word', 'worm', 'worry'])
  })

  it('should return continuation of words', function () {
    let trie = new Trie ();
    trie.insert('work')
    trie.insert('working')
    // console.log(JSON.stringify(trie, null, 4))

    expect(trie.suggest('wor')).to.deep.equal(['work', 'working'])
  })

  it('should populate the trie with the dictionary', function () {
    let trie = new Trie ();

    trie.populate(dictionary)
    expect(trie._length).to.deep.equal(235886)
  })

  it('should suggest words starting with "piz" after the dictionary is populated', function () {
    let trie = new Trie ();

    trie.populate(dictionary)
    expect(trie.suggest("piz")).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
  })

  it.skip('should suggest words starting with "piz" after the dictionary is populated', function () {
    let trie = new Trie ();

    trie.populate(dictionary)
    console.log(trie.suggest("piz"))
      expect(trie.suggest("piz")).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])

    trie.select("piz", "pizzeria")

    trie.suggest("piz")
      expect(trie.suggest("piz")).to.deep.equal(["pizzeria", "pize", "pizza", "pizzicato", "pizzle"])
  })

})

// console.log(JSON.stringify(trie, null, 4))
