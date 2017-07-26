const $search = $('.search');
const $enterBtn = $('.enter-btn');

class Node {
  constructor(data) {
    this.data = data;
    this.children = {};
    this.completeWord = null;
  }
}

class Trie {
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

/******************************************************/

const trie = new Trie();

$enterBtn.on('click', function () {
  trie.insert($search.val());
  $search.val('');
  $('.suggestions').children().remove();

  // trie.suggestedWordArray = []
  console.log(trie);
})

$search.on('keyup', function () {
  $('.suggestions').children().remove();
  let suggestedWords = trie.suggest($search.val());
  suggestedWords.forEach((word) => {
    $('.suggestions').append(`<p class="suggested-word">${word}</p>`)
  })

  //if the word doesn't exist in suggest[]

})
