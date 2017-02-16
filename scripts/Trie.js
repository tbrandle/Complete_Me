import { Node } from '../scripts/Node.js'
require('locus')
const text = "/usr/share/dict/words"
const fs = require('fs');

let dictionary = fs.readFileSync(text, 'utf8').trim().split('\n')

export class Trie {
  constructor() {
    this.head = {}
    this._length = 0
  }

  insert(word) {
    this._length ++;
    let current = this.head;
    let wordArray = word.split('').forEach((value, index, array) => {
      if (!current.hasOwnProperty(value)) {
        current[value] = new Node(value)
      }
      if (index === word.length - 1) {
        current[value].completeWord = array.join('')
      }
      eval(locus)
       current = current[value].children
    })
    // eval(locus)
  }

  suggest(string){
    let currentNode = string.split('').reduce((current, value) => {
      return current[value] ? current = current[value].children : current
    }, this.head)
    return this.findCompleteWord(currentNode)
  }

  findCompleteWord(currentNode){
    let temp = Object.keys(currentNode)
    let suggestedWordArray = temp.map((key) => {
      let newCurrent = currentNode[key]
      return !newCurrent.completeWord ?
             this.findCompleteWord(newCurrent.children) :
             newCurrent.completeWord
    })
    return this.flatten(suggestedWordArray)
  }

  flatten(array){
    let flattenArray =  array.reduce((arr, value) => {
      return arr.concat(Array.isArray(value) ? this.flatten(value) : value)
    }, [])
    return flattenArray;
  }

  populate(dictionary){
    dictionary.forEach(word => {
      this.insert(word)
    })
  }

  select(string, word){
  //find the "currentNode" of the partial string that is passed in.
    // let currentNode = string.split('').reduce((current, value) => {
    //   return current[value] ? current = current[value].children : current
    // }, this.head)

  // save the selected word as a property of that node.
  // in suggest() add an or statement
      // return suggestedWord || completeWord

  }
}
