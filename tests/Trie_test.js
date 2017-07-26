import { expect } from 'chai';
import { Trie } from '../scripts/Trie.js';
const text = '/usr/share/dict/words';
const fs = require('fs');
let dictionary = fs.readFileSync(text, 'utf8').trim().split('\n');


describe('TDD with Trie', () => {

  it('trie.head should start off as an empty node', function () {
    let trie = new Trie ();
    expect(trie.head).to.deep.equal(
      { data: undefined,
        children: {},
        completeWord: null });
  });

  it('should increase the count when a word is added', function () {
    let trie = new Trie ();
    expect(trie._length).to.deep.equal(0);
    trie.insert('apple');
    expect(trie._length).to.deep.equal(1);
  });

  it('should set the first letter of the word to the children of this.head', function () {
    let trie = new Trie ();
    trie.insert('apple');
    expect(trie.head.children['a'].data).to.deep.equal('a');
  });

  it('should nest the second letter of the word to the children of the first letter', function () {
    let trie = new Trie ();
    trie.insert('apple');
    expect(trie.head.children['a'].data).to.deep.equal('a');
    expect(trie.head.children['a'].children['p'].data).to.deep.equal('p');
  });

  it('should increase the trie._length for each word that gets added to the trie', function () {
    let trie = new Trie ();
    trie.insert('world');
    trie.insert('word');
    trie.insert('worm');
    trie.insert('worry');
    trie.insert('can');
    expect(trie._length).to.deep.equal(5);
  });

  it('should assign the completeWord value to the last index of the word', function () {
    let trie = new Trie ();
    trie.insert('world');
    expect(trie.head.children['w'].children['o'].children['r'].children['l'].completeWord).to.deep.equal(null);
    expect(trie.head.children['w'].children['o'].children['r'].children['l'].children['d'].completeWord).to.deep.equal('world');
  });

  it('suggestedWordArray should start as an empty array', function () {
    let trie = new Trie ();
    expect(trie.suggestedWordArray).to.deep.equal([]);
  });

  it('suggest should return the completeWord value of the last index of the word', function () {
    let trie = new Trie ();
    trie.insert('world');
    expect(trie.suggest('wor')).to.deep.equal(['world']);
  });

  it('suggest should return a list of words', function () {
    let trie = new Trie ();
    trie.insert('world');
    trie.insert('word');
    trie.insert('worm');
    trie.insert('worry');
    trie.insert('can');

    trie.suggest('wo');

    expect(trie.suggestedWordArray).to.deep.equal(['world', 'word', 'worm', 'worry']);
  });

  it('should clear the suggestedWordArray once the suggest() function is called again and return a new array of words', function () {
    let trie = new Trie ();
    trie.insert('world');
    trie.insert('word');
    trie.insert('worm');
    trie.insert('worry');
    trie.insert('can');

    trie.suggest('wo');

    expect(trie.suggestedWordArray).to.deep.equal(['world', 'word', 'worm', 'worry']);

    trie.suggest('ca');

    expect(trie.suggestedWordArray).to.deep.equal(['can']);
  });

  it('should return continuation of words', function () {
    let trie = new Trie ();
    trie.insert('work');
    trie.insert('working');
    expect(trie.suggest('wor')).to.deep.equal(['work', 'working']);
  });

  it('should populate the trie with the dictionary', function () {
    let trie = new Trie ();

    trie.populate(dictionary);

    expect(trie._length).to.deep.equal(235886);
  });

  it('should suggest words starting with "piz" after the dictionary is populated', function () {
    let trie = new Trie ();

    trie.populate(dictionary);
    expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);
  });

  it('should suggest words starting with "piz" after the dictionary is populated', function () {
    let trie = new Trie ();

    trie.populate(dictionary);

    trie.select('piz', 'pizzeria');

    trie.suggest('piz');
    expect(trie.suggest('piz')).to.deep.equal(['pizzeria', 'pize', 'pizza', 'pizzicato', 'pizzle']);
  });

});
