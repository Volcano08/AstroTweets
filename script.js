// DOM Elements
const tweetContainer = document.getElementById('tweet-container');

// Helper Function to Create a Tweet
function createTweet(content, username, profilePic, hashtag, tweetIndex = null) {
    const tweet = document.createElement('div');
    tweet.classList.add('tweet');
    tweet.setAttribute('data-index', tweetIndex);

    tweet.innerHTML = `
        <div class="tweet-header">
            <img src="${profilePic}" alt="User" class="profile-pic">
            <span class="username">${username}</span>
        </div>
        <p class="tweet-content">${content}</p>
        <div class="tweet-footer">
            <span class="hashtag">#${hashtag}</span>
            <span class="time">Just now</span>
        </div>
        <div class="tweet-actions">
            <button class="action-btn like-btn">Like</button>
            ${username === 'User123' ? `<button class="action-btn delete-btn" data-index="${tweetIndex}">Delete</button>` : ''}
        </div>
    `;
    return tweet;
}

// Base Tweets with editable #hashtag field
const baseTweets = [
    { content: "Earth revolves around a central fire 🔥 (yeah, not the Sun, weird flex, I know). Also, I was the first to drop the ‘harmony of the spheres’ mixtape 🎶. Who knew ancient math and music were so in sync?", username: "Pythagoras of Samos", profilePic: "Images/Pythagoras.png", hashtag: "CosmicDJ" },
    { content: "Calculated Earth’s circumference with no satellites, GPS, or Google Earth 🌍. Just a stick, a shadow, and a whole lotta math 🔢. Oh, and I made the first global map 🗺️.", username: "Eratosthenes of Cyrene", profilePic: "Images/Eratosthenes.png", hashtag: "EarthMaster" },
    { content: "Thought those fuzzy patches in the sky were just clouds? Haha, nope – GALAXIES. Also, the universe? It’s expanding like my weekend plans 🏃‍♂️💨.", username: "Edwin Hubble", profilePic: "Images/Hubble.png", hashtag: "GalacticExpansion" },
    { content: "Relativity? Boom, nailed it 💥. Predicted black holes 🕳️, and showed light bends around massive objects – like gravity’s personal dance moves 💃.", username: "Albert Einstein", profilePic: "Images/Einstein.png", hashtag: "RelativityRocks" },
    { content: "Predicted a solar eclipse 🌞🌑 and calculated solstices and equinoxes like I had an ancient version of Google Calendar.", username: "Thales of Miletus", profilePic: "Images/Thales.png", hashtag: "SolarEclipseMaster" },
    { content: "First to say, ‘Hey, maybe the Earth’s not the center of the universe’ 🌍. Created the heliocentric model, but sure, I’ll let you guys catch up.", username: "Nicolaus Copernicus", profilePic: "Images/Copernicus.png", hashtag: "HeliocentricHustle" },
    { content: "Developed a solar system model that’s basically the ‘Frankenstein’ of heliocentric and geocentric theories 🔬💥. Call it the ‘Tychonic Mashup’ 🎶.", username: "Tycho Brahe", profilePic: "Images/Tycho\ Brahe.png", hashtag: "HybridTheory" },
    { content: "Proved the Earth’s not the center, discovered Jupiter’s moons 🌙, and showed the Moon’s surface is a total mess 🌕. First to bring the #NoFilter to celestial bodies", username: "Galileo Galilei", profilePic: "Images/Galileo.png", hashtag: "GalileoKnows" },
    { content: "Planets orbiting? Check ✅. Apple falling? Yup, that happened 🍏. Oh, and I invented calculus and revolutionized optics 🔍. Guess I just didn’t have enough time to cure boredom.", username: "Isaac Newton", profilePic: "Images/Newton.png", hashtag: "GravityRules" },
    { content: "Black holes aren’t just space vacuums 🕳️, they’re emitting radiation (now that's a plot twist) 🌌. Oh, and they disappear over time. Honestly, they’re the universe’s best magic trick.", username: "Stephen Hawking", profilePic: "Images/Hawking.png", hashtag: "BlackHoleRealness" }
];

// Delete Tweet from Local Storage
function deleteTweetFromStorage(tweetIndex) {
    let tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    tweets.splice(tweetIndex, 1);  // Remove the tweet from the array
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Display All Tweets
function loadTweets() {
    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    // Display Base Tweets First
    baseTweets.forEach((tweet, index) => {
        const tweetElement = createTweet(tweet.content, tweet.username, tweet.profilePic, tweet.hashtag, index);
        tweetContainer.appendChild(tweetElement);
    });

    // Display Tweets from Local Storage
    tweets.forEach((tweet, index) => {
        const tweetElement = createTweet(tweet.content, tweet.username, tweet.profilePic, tweet.hashtag, index);
        tweetContainer.appendChild(tweetElement);
    });
}

// Like Tweet Event
tweetContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-btn')) {
        e.target.classList.toggle('liked');
        e.target.textContent = e.target.classList.contains('liked') ? 'Liked' : 'Like';
    }
});

// Delete Tweet Event (Only for Your Tweets)
tweetContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn') && e.target.closest('.tweet').querySelector('.username').textContent === 'User123') {
        const tweetIndex = e.target.getAttribute('data-index');
        // Remove tweet from the display
        e.target.closest('.tweet').remove();
        // Remove tweet from localStorage
        deleteTweetFromStorage(tweetIndex);
    }
});

// Load Base and Saved Tweets on Page Load
window.onload = loadTweets;
