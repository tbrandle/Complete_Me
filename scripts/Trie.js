import { Node } from '../scripts/Node.js';
require('locus');

export class Trie {
  constructor() {
    this.head = new Node();
    this._length = 0;
    this.suggestedWordArray = [];
  }

  insert(word) {
    this._length ++;
    let current = this.head;
    word.split('').forEach((value, index, array) => {
      if (!current.children.hasOwnProperty(value)) {
        current.children[value] = new Node(value);
      }
      current = current.children[value];
      if (index === word.length - 1) {
        current.completeWord = array.join('');
      }
    });
  }

  suggest(string){
    this.suggestedWordArray = [];
    let currentNode = string.split('').reduce((current, value) => {
      return current.children[value] ?
             current = current.children[value] :
             current;
    }, this.head);
    return this.findCompleteWord(currentNode);
  }

  findCompleteWord(currentNode){
    let temp = Object.keys(currentNode.children);
    temp.forEach( key => {
      let newCurrent = currentNode.children[key];
      if (newCurrent.completeWord) {
        this.suggestedWordArray.push(newCurrent.completeWord);
      }
      return this.findCompleteWord(newCurrent);
    });
    return this.suggestedWordArray;
  }

  populate(dictionary){
    dictionary.forEach(word => {
      this.insert(word);
    });
  }
}








// select(string, word){
  //find the "currentNode" of the partial string that is passed in.
  // let currentNode = string.split('').reduce((current, value) => {
  //   return current[value] ? current = current[value].children : current
  // }, this.head)

  // save the selected word as a property of that node.
  // in suggest() add an or statement
  // return suggestedWord || completeWord
