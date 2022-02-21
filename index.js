const axios = require('axios');
const cheerio = require('cheerio');
const { index } = require('cheerio/lib/api/traversing');

const fetchEpisodes = async () => {
  try {
    const response = await axios.get(
      'https://www.cartoonnetwork.com/video/adventure-time/index.html'
    );

    const html = response.data;

    const $ = cheerio.load(html);

    const episodes = [];

    // targeting the parts of the website I want to select
    // Grabbing section with unlocked and div's that have the title of the episode
    $(' section#unlocked div.feature-video-title').each((_idx, el) => {
      const episode = $(el).text();
      episodes.push(episode);
    });

    return episodes;
  } catch (error) {
    throw error;
  }
};
fetchEpisodes().then((episodes) => {
  //   let episodeList = episodes.join('<br>');

  // https://gomakethings.com/two-more-ways-to-create-html-from-an-array-of-data-with-vanilla-js/
  //Look at all the episodes
  episodes.forEach((episode, index) => {
    const episodeLink = `https://cartoonnetwork.com/video/adventure-time/${episode
      .toLowerCase()
      .replace(/\s/g, '-')}-episode.html`;
    console.log(episodeLink);
    let link = document.getElementById('episodes-of-the-day');
    // create the div element
    let div = document.createElement('div');
    // give the text element of the div the episode title
    div.setAttribute('id', index);
    link.appendChild(div);
    let title = document.getElementById(index);
    let a = document.createElement('a');
    a.setAttribute('id', episode);
    a.setAttribute('href', episodeLink);
    a.setAttribute('target', '_blank');
    title.append(a);
    a.textContent = episode;
    // div.textContent = episode;
    // append(insert) the div into the DOM
  });
});
