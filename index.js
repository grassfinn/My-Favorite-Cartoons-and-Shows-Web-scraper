const axios = require('axios');
const cheerio = require('cheerio');
const { index } = require('cheerio/lib/api/traversing');
const { find } = require('domutils');

// TODO
// Make masterlist
const MASTERLIST = [];

// const EXTRAINFO = []

// Append master list to frontend

const fetchAtEpisodes = async () => {
  try {
    const response = await axios.get(
      'https://www.cartoonnetwork.com/video/adventure-time/index.html'
    );

    const html = response.data;

    const $ = cheerio.load(html);

    // const episodes = [];

    // find way to target thumbnails
    // const thumbnails = [];

    // targeting the parts of the website I want to select
    // Grabbing section with unlocked and div's that have the title of the episode
    $(
      'section#unlocked div.video-list-wrapper > div.feature-video-wrapper'
    ).each((_idx, el) => {
      // searching the element and finding the div I am calling it and the text
      const title = $(el).find('div.feature-video-title').text();
      const link = $(el).find('a.feature-video-a').attr('href');
      const thumbnail = $(el).find('img.feature-video-icon').attr('src');
      const season = $(el).find('span.feature-video-info-season').text();
      const episodeNumber = $(el).find('span.feature-video-info-aired-date').text();

      MASTERLIST.push({ title, link, thumbnail, season, episodeNumber });
    });
    return MASTERLIST;
  } catch (error) {
    throw error;
  }
};
fetchAtEpisodes().then((episodes) => {

  // https://gomakethings.com/two-more-ways-to-create-html-from-an-array-of-data-with-vanilla-js/
  //Look at all the episodes
  episodes.forEach((data, index) => {
    console.log({ data });
    const episode = data.title;
    const episodeThumbnail = data.thumbnail
    const episodeUrl = data.link
    const episodeSeason = data.season
    const number = data.episodeNumber
    const episodeLink = `https://cartoonnetwork.com${episodeUrl}`

    console.log(episodeLink);
    let parent = document.getElementById('at-episodes-of-the-day');
    // create the div element
    let div = document.createElement('div');
    // give the text element of the div the episode title
    div.setAttribute('id', 'at-' + index);
    // episode container
    parent.append(div);
    // thumbnail and link

    const episodeRegex = episode.toLowerCase().replace(/\s/g, '-')
    let title = document.getElementById('at-' + index);
    let a = document.createElement('a');
    a.setAttribute('id', episodeRegex);
    a.setAttribute('href', episodeLink);
    a.setAttribute('target', '_blank');
    title.append(a);
    // a.textContent = episode;
    
    // creating the thumbnail and title
    let thumbnail = document.getElementById(episodeRegex)
    let img = document.createElement('img')
    img.setAttribute('id', episodeRegex + '-thumbnail')
    img.classList.add("at-thumbnail")
    img.setAttribute('src', episodeThumbnail)
    let p =document.createElement('p')
    p.classList.add('at-title')
    p.textContent = `${episode} ${episodeSeason} ${number}`
    thumbnail.append(img)
    thumbnail.append(p)

    // div.textContent = episode;
    // append(insert) the div into the DOM
  });
});

// const fetchSuEpisodes = async () => {
//   try {
//     const response = await axios.get(
//       'https://www.cartoonnetwork.com/video/steven-universe/index.html'
//     );

//     const html = response.data;

//     const $ = cheerio.load(html);

//     const episodes = [];

//     // targeting the parts of the website I want to select
//     // Grabbing section with unlocked and div's that have the title of the episode
//     $(' section#unlocked div.feature-video-title').each((_idx, el) => {
//       const episode = $(el).text();
//       episodes.push(episode);
//     });

//     return episodes;
//   } catch (error) {
//     throw error;
//   }
// };

// fetchSuEpisodes().then((episodes) => {
//   //   let episodeList = episodes.join('<br>');

//   // https://gomakethings.com/two-more-ways-to-create-html-from-an-array-of-data-with-vanilla-js/
//   //Look at all the episodes
//   episodes.forEach((episode, index) => {
//     const episodeLink = `https://cartoonnetwork.com/video/steven-universe/${episode
//       .toLowerCase()
//       .replace(/\s/g, '-')}-episode.html`;
//     console.log(episodeLink);
//     let link = document.getElementById('su-episodes-of-the-day');
//     // create the div element
//     let div = document.createElement('div');
//     // give the text element of the div the episode title
//     div.setAttribute('id', 'su ' + index);
//     link.append(div);
//     let title = document.getElementById('su ' + index);
//     let a = document.createElement('a');
//     a.setAttribute('id', episode);
//     a.setAttribute('href', episodeLink);
//     a.setAttribute('target', '_blank');
//     title.append(a);
//     a.textContent = episode;
//     // div.textContent = episode;
//     // append(insert) the div into the DOM
//   });
// });

// const fetchYtMovies = async () => {
//   try {
//     const response = await axios.get(
//       'https://www.youtube.com/feed/storefront?bp=kgEDCPYDogUCKAU%3D'
//     );

//     const html = response.data;

//     const $ = cheerio.load(html);

//     const movies = [];

//     // targeting the parts of the website I want to select
//     // Grabbing section with unlocked and div's that have the title of the episode
//     $(' section#unlocked div.feature-video-title').each((_idx, el) => {
//       const episode = $(el).text();
//       episodes.push(episode);
//     });
//     console.log(movies);
//     return movies;
//   } catch (error) {
//     throw error;
//   }
// };
