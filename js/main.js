import data from './data.js';


// removes duplicate words from string
const removeDuplicateWords = string => [...new Set(string.split(' '))].join(' ')

// removes duplicate words from emoji object.keywords
const fmtCard = emojiCard => {
  emojiCard.keywords = removeDuplicateWords(emojiCard.keywords)
  return emojiCard
}

// process all data file for keyword duplicates
const fmtEmojiJSON = emojiData => emojiData.map(item => fmtCard(item))

// filter duplicate keywords
const allEmojis = fmtEmojiJSON(data)


// Json to html for emoji item
const createEmojiCard = emojiObj => {
  // {
  //   title: 'Grinning',
  //   symbol: '😀',
  //   keywords: 'grinning face happy smiley',
  // }
  const {symbol, title, keywords} = emojiObj
  const card = document.createElement('div')
  card.className = 'emoji-wrapper'
  card.innerHTML = `<p class='emoji__symbol'>${symbol}</p>
                    <p class='emoji__title'>${title}</p>
                    <p class='emoji__keywords'>${keywords}</p>`
  return card
}


// select container for card
const cardContainer = document.querySelector('div.main-wrapper')


// function that generates html from array with json
const renderFromData = dataArr => dataArr.forEach(emojiItem => cardContainer.append(createEmojiCard(emojiItem)))

// Initial generation of all emoji cards
renderFromData(allEmojis)

// select input
const form = document.querySelector('input.header__input')

// remove all emoji from html
const clearEmoji = () => cardContainer.innerHTML = ''

// add listener that filters content
form.addEventListener('input', event => {
  const fmtInput = event.target.value.toLowerCase().trim()
  const filteredEmojis = allEmojis.filter(
    emoji => emoji.title.includes(fmtInput) || emoji.keywords.includes(fmtInput))
  clearEmoji()
  renderFromData(filteredEmojis)
})


