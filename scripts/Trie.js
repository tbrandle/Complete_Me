import { Node } from '../scripts/Node.js'
require('locus')
const text = "/usr/share/dict/words"
const fs = require('fs');

let dictionary = fs.readFileSync(text, 'utf8').trim().split('\n')

export class Trie {
  constructor() {
    this.head = new Node()
    this._length = 0
  }

  insert(word) {
    this._length ++;
    let current = this.head;
    let wordArray = word.split('').forEach((value, index, array) => {
      if (!current.children.hasOwnProperty(value)) {
        current.children[value] = new Node(value)
      }

      current = current.children[value]

      if (index === word.length - 1) {
        // eval(locus)
        current.completeWord = array.join('')
      }
    })
  }

  suggest(string){
    let currentNode = string.split('').reduce((current, value) => {
      if (current.children[value]) {
        return current = current.children[value]
      } else {
        return current
      }
      // return current[value] ? current = current[value].children : current[value]
    }, this.head)
    return this.findCompleteWord(currentNode)
  }

  findCompleteWord(currentNode){
    let temp = Object.keys(currentNode.children)

    let suggestedWordArray = temp.map( key => {
      let newCurrent = currentNode.children[key]
      if (!newCurrent.completeWord) {
        return this.findCompleteWord(newCurrent)
      } else {
        return newCurrent.completeWord
      }
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


// return !newCurrent.completeWord ?
//        this.findCompleteWord(newCurrent) :
//        newCurrent.completeWord
