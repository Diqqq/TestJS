// Downloading HTML Elements
const newQuoteBtn = document.querySelector('.new-quote')
const author = document.querySelector('.author')
const quoteText = document.querySelector('.quote')
const twitterBtn = document.querySelector('.twitter-button')
const loader = document.querySelector('.loader')
const quoteContainer = document.querySelector('.quote-container')

let apiQuotes

// Show Loading
const loading = () => {
	loader.hidden = false;
	quoteContainer.hidden = true
}

// Hide Loading
const complete = () => {
	quoteContainer.hidden = false
	loader.hidden = true;
}

// Show New Quote
const newQuote = () => {
	loading()
	// Picking a random quote from the array
	const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

	// Check if author is available
	if(!randomQuote.author) { // simplified version of randomQuote.author === null (it translates to: if there is NO author)
		author.textContent = 'Author unknown'
	} else {
		author.textContent = randomQuote.author
	}
	
	// Check Quote lenght to determine styling
	if (randomQuote.text.length > 100) { // Tip: text.length characters include spaces
		quoteText.classList.add('long-quote')
	} else { 
		quoteText.classList.remove('long-quote')
	}

	// Set Quote, Hide Loader
	quoteText.textContent = randomQuote.text
	complete()
}
// Get Quotes From API
async function getQuotes() {
	loading()
	const API_KEY = 'https://type.fit/api/quotes'
	try {
		const response = await fetch(API_KEY)
		apiQuotes = await response.json()
		newQuote()
	} catch (error) {
		console.log(error)
		// Catch Error Here
	}
}
// Tweet Quote
const tweetQuote = () => {
	const TWITTER_URL = 'https://twitter.com/intent/tweet'
	const TWITTER_TEXT = `?text=${quoteText.textContent} - ${author.textContent}`
	const tweetQuote = TWITTER_URL+TWITTER_TEXT
	window.open(tweetQuote, '_blank')
}

// AddEventListeners
newQuoteBtn.addEventListener('click', getQuotes)
twitterBtn.addEventListener('click', tweetQuote)
// On Load
getQuotes()

