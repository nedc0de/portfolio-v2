/*=============== FAVORITES: FLIP CARD WALL ===============*/
// Covers load automatically:
// - movies & TV shows from TMDB via netlify/functions/tmdb.js
//   (the key lives in a server-side env var, never in this file)
// - books from Open Library (no key needed)
// To add a favorite, add one line to FAVORITES. Fields:
//   type: 'book' | 'movie' | 'tv'      title, year, by (author / director), genre
//   rating: 0-5 (halves are fine)      take: your one-line review (optional)
//   cover: 'img/covers/file.jpg'  -> use your own image instead (optional)
//   tmdbId: 12345                 -> force the exact TMDB title if the search picks the wrong one (optional)
(() => {
  const grid = document.getElementById('favGrid');
  const homeCard = document.querySelector('.xb-mv'); // the "just watched" card on the home page
  const labReceipt = document.getElementById('labReceipt'); // the Lab's receipt printer
  if (!grid && !homeCard && !labReceipt) return;

  /*---------- settings ----------*/
  const COVER_CACHE_KEY = 'nedcode-fav-covers-v1';
  const CACHE_DAYS_FOUND = 30;
  const CACHE_DAYS_MISSING = 3;

  /*---------- your favorites ----------*/
  const FAVORITES = [
    // ----- Books -----
    {
      type: 'book',
      title: 'Meditations',
      by: 'Marcus Aurelius',
      genre: 'Philosophy',
      rating: 5,
    },
    {
      type: 'book',
      title: 'The 4-Hour Workweek',
      by: 'Tim Ferriss',
      genre: 'Business',
      rating: 5,
    },
    {
      type: 'book',
      title: 'The Obstacle Is the Way',
      by: 'Ryan Holiday',
      genre: 'Self-help',
      rating: 5,
    },
    {
      type: 'book',
      title: "Trust Me, I'm Lying",
      by: 'Ryan Holiday',
      genre: 'Media',
      rating: 4.5,
    },
    {
      type: 'book',
      title: 'The Alchemist',
      by: 'Paulo Coelho',
      genre: 'Fiction',
      rating: 5,
    },
    {
      type: 'book',
      title: 'Start with Why',
      by: 'Simon Sinek',
      genre: 'Leadership',
      rating: 5,
    },
    {
      type: 'book',
      title: 'The 48 Laws of Power',
      by: 'Robert Greene',
      genre: 'Strategy',
      rating: 5,
    },
    {
      type: 'book',
      title: 'The 50th Law',
      by: 'Robert Greene',
      genre: 'Strategy',
      rating: 4,
    },
    {
      type: 'book',
      title: 'Elon Musk',
      by: 'Ashlee Vance',
      genre: 'Biography',
      rating: 4,
    },
    {
      type: 'book',
      title: 'Persuasion',
      by: 'Arlene Dickinson',
      genre: 'Business',
      rating: 3.5,
    },
    {
      type: 'book',
      title: 'Unlimited Power',
      by: 'Tony Robbins',
      genre: 'Self-help',
      rating: 5,
    },

    // ----- Movies -----
    {
      type: 'movie',
      title: 'There Will Be Blood',
      year: 2007,
      by: 'Paul Thomas Anderson',
      genre: 'Drama',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Animals',
      year: 2026,
      by: 'Ben Affleck',
      genre: 'Thriller',
      rating: 3,
    },
    {
      type: 'movie',
      title: 'The Housemaid',
      year: 2025,
      by: 'Paul Feig',
      genre: 'Thriller',
      rating: 4.8,
    },
    {
      type: 'movie',
      title: 'Deadpool & Wolverine',
      year: 2024,
      by: 'Shawn Levy',
      genre: 'Superhero',
      rating: 3,
    },
    {
      type: 'movie',
      title: 'Carry-On',
      year: 2024,
      by: 'Jaume Collet-Serra',
      genre: 'Thriller',
      rating: 3,
    },
    {
      type: 'movie',
      title: 'Gladiator II',
      year: 2024,
      by: 'Ridley Scott',
      genre: 'Action',
      rating: 3,
    },
    {
      type: 'movie',
      title: 'Furiosa: A Mad Max Saga',
      year: 2024,
      by: 'George Miller',
      genre: 'Action',
      rating: 4.4,
    },
    {
      type: 'movie',
      title: 'The Beekeeper',
      year: 2024,
      by: 'David Ayer',
      genre: 'Action',
      rating: 3.5,
    },
    {
      type: 'movie',
      title: 'Road House',
      year: 2024,
      by: 'Doug Liman',
      genre: 'Action',
      rating: 3.6,
    },
    {
      type: 'movie',
      title: 'Blink Twice',
      year: 2024,
      by: 'Zoë Kravitz',
      genre: 'Thriller',
      rating: 4.6,
    },
    {
      type: 'movie',
      title: 'Trap',
      year: 2024,
      by: 'M. Night Shyamalan',
      genre: 'Thriller',
      rating: 3.2,
    },
    {
      type: 'movie',
      title: 'Rebel Ridge',
      year: 2024,
      by: 'Jeremy Saulnier',
      genre: 'Thriller',
      rating: 3,
    },
    {
      type: 'movie',
      title: 'Michael',
      year: 2026,
      by: 'Antoine Fuqua',
      genre: 'Biography',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Spider-Man: Brand New Day',
      year: 2026,
      by: 'Destin Daniel Cretton',
      genre: 'Superhero',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Project Hail Mary',
      year: 2026,
      by: 'Phil Lord & Christopher Miller',
      genre: 'Sci-fi',
      rating: 4.7,
    },
    {
      type: 'movie',
      title: 'F1',
      year: 2025,
      by: 'Joseph Kosinski',
      genre: 'Sports',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Frankenstein',
      year: 2025,
      by: 'Guillermo del Toro',
      genre: 'Horror',
      rating: 4.7,
    },
    {
      type: 'movie',
      title: 'Havoc',
      year: 2025,
      by: 'Gareth Evans',
      genre: 'Action',
      rating: 4.2,
    },
    {
      type: 'movie',
      title: 'Avatar: Fire and Ash',
      year: 2025,
      by: 'James Cameron',
      genre: 'Sci-fi',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'Thunderbolts*',
      year: 2025,
      by: 'Jake Schreier',
      genre: 'Superhero',
      rating: 3.3,
    },
    {
      type: 'movie',
      title: 'Mickey 17',
      year: 2025,
      by: 'Bong Joon Ho',
      genre: 'Sci-fi',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'Lilo & Stitch',
      year: 2025,
      by: 'Dean Fleischer Camp',
      genre: 'Family',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'The Woman in Cabin 10',
      year: 2025,
      by: 'Simon Stone',
      genre: 'Thriller',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'Tron: Ares',
      year: 2025,
      by: 'Joachim Rønning',
      genre: 'Sci-fi',
      rating: 3.8,
    },
    {
      type: 'movie',
      title: 'The Accountant 2',
      year: 2025,
      by: "Gavin O'Connor",
      genre: 'Action',
      rating: 3.3,
    },
    {
      type: 'movie',
      title: 'Marty Supreme',
      year: 2025,
      by: 'Josh Safdie',
      genre: 'Drama',
      rating: 3.5,
    },
    {
      type: 'movie',
      title: 'The Gorge',
      year: 2025,
      by: 'Scott Derrickson',
      genre: 'Action',
      rating: 3.5,
    },
    {
      type: 'movie',
      title: 'Superman',
      year: 2025,
      by: 'James Gunn',
      genre: 'Superhero',
      rating: 3,
    },
    {
      type: 'movie',
      title: 'Oppenheimer',
      year: 2023,
      by: 'Christopher Nolan',
      genre: 'Biography',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Interstellar',
      year: 2014,
      by: 'Christopher Nolan',
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Inception',
      year: 2010,
      by: 'Christopher Nolan',
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Dunkirk',
      year: 2017,
      by: 'Christopher Nolan',
      genre: 'War',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Blade Runner 2049',
      year: 2017,
      by: 'Denis Villeneuve',
      genre: 'Sci-fi',
      rating: 4.4,
    },
    {
      type: 'movie',
      title: 'Dune',
      year: 2021,
      by: 'Denis Villeneuve',
      genre: 'Sci-fi',
      rating: 4.1,
    },
    {
      type: 'movie',
      title: 'Arrival',
      year: 2016,
      by: 'Denis Villeneuve',
      genre: 'Sci-fi',
      rating: 4,
    },
    {
      type: 'movie',
      title: '2001: A Space Odyssey',
      year: 1968,
      by: 'Stanley Kubrick',
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Ad Astra',
      year: 2019,
      by: 'James Gray',
      genre: 'Sci-fi',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'First Man',
      year: 2018,
      by: 'Damien Chazelle',
      genre: 'Biography',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Gravity',
      year: 2013,
      by: 'Alfonso Cuarón',
      genre: 'Sci-fi',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'Ex Machina',
      year: 2014,
      by: 'Alex Garland',
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Prometheus',
      year: 2012,
      by: 'Ridley Scott',
      genre: 'Sci-fi',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'Oblivion',
      year: 2013,
      by: 'Joseph Kosinski',
      genre: 'Sci-fi',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'The Matrix',
      year: 1999,
      by: 'Lana & Lilly Wachowski',
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Memento',
      year: 2000,
      by: 'Christopher Nolan',
      genre: 'Thriller',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Eyes Wide Shut',
      year: 1999,
      by: 'Stanley Kubrick',
      genre: 'Thriller',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Joker',
      year: 2019,
      by: 'Todd Phillips',
      genre: 'Thriller',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Shutter Island',
      year: 2010,
      by: 'Martin Scorsese',
      genre: 'Thriller',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'Tenet',
      year: 2020,
      by: 'Christopher Nolan',
      genre: 'Action',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'The Dark Knight',
      year: 2008,
      by: 'Christopher Nolan',
      genre: 'Action',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Fight Club',
      year: 1999,
      by: 'David Fincher',
      genre: 'Drama',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Mad Max: Fury Road',
      year: 2015,
      by: 'George Miller',
      genre: 'Action',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'The Shining',
      year: 1980,
      by: 'Stanley Kubrick',
      genre: 'Horror',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'A Clockwork Orange',
      year: 1971,
      by: 'Stanley Kubrick',
      genre: 'Crime',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Legend',
      year: 2015,
      by: 'Brian Helgeland',
      genre: 'Crime',
      rating: 3.5,
    },
    {
      type: 'movie',
      title: 'Catch Me If You Can',
      year: 2002,
      by: 'Steven Spielberg',
      genre: 'Crime',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'The Departed',
      year: 2006,
      by: 'Martin Scorsese',
      genre: 'Crime',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'The Godfather',
      year: 1972,
      by: 'Francis Ford Coppola',
      genre: 'Crime',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'The Godfather Part II',
      year: 1974,
      by: 'Francis Ford Coppola',
      genre: 'Crime',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'The Godfather Part III',
      year: 1990,
      by: 'Francis Ford Coppola',
      genre: 'Crime',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Scarface',
      year: 1983,
      by: 'Brian De Palma',
      genre: 'Crime',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Public Enemies',
      year: 2009,
      by: 'Michael Mann',
      genre: 'Crime',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'Pulp Fiction',
      year: 1994,
      by: 'Quentin Tarantino',
      genre: 'Crime',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'Django Unchained',
      year: 2012,
      by: 'Quentin Tarantino',
      genre: 'Western',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'Killers of the Flower Moon',
      year: 2023,
      by: 'Martin Scorsese',
      genre: 'Western',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'Lawless',
      year: 2012,
      by: 'John Hillcoat',
      genre: 'Crime',
      rating: 4,
    },
    {
      type: 'movie',
      title: 'Once Upon a Time in Hollywood',
      year: 2019,
      by: 'Quentin Tarantino',
      genre: 'Comedy',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: 'The Wolf of Wall Street',
      year: 2013,
      by: 'Martin Scorsese',
      genre: 'Comedy',
      rating: 4.5,
    },
    {
      type: 'movie',
      title: "What's Eating Gilbert Grape",
      year: 1993,
      by: 'Lasse Hallström',
      genre: 'Drama',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'Good Will Hunting',
      year: 1997,
      by: 'Gus Van Sant',
      genre: 'Drama',
      rating: 5,
    },
    {
      type: 'movie',
      title: 'The Aviator',
      year: 2004,
      by: 'Martin Scorsese',
      genre: 'Biography',
      rating: 4,
    },
    {
      type: 'movie',
      title: '1917',
      year: 2019,
      by: 'Sam Mendes',
      genre: 'War',
      rating: 5,
    },

    // ----- TV shows -----
    {
      type: 'tv',
      title: 'The Diplomat',
      year: 2023,
      genre: 'Thriller',
      rating: 5,
      take: 'Seasons 1 to 4. Very good.',
    },
    { type: 'tv', title: 'The First', year: 2018, genre: 'Sci-fi', rating: 5 },
    {
      type: 'tv',
      title: 'Black Mirror',
      year: 2011,
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'tv',
      title: 'Westworld',
      year: 2016,
      genre: 'Sci-fi',
      rating: 4.5,
    },
    {
      type: 'tv',
      title: 'Raised by Wolves',
      year: 2020,
      genre: 'Sci-fi',
      rating: 4,
    },
    {
      type: 'tv',
      title: 'Succession',
      year: 2018,
      genre: 'Drama',
      rating: 3.5,
    },
    {
      type: 'tv',
      title: "The Queen's Gambit",
      year: 2020,
      genre: 'Drama',
      rating: 4,
    },
    { type: 'tv', title: 'Dark', year: 2017, genre: 'Mystery', rating: 5 },
    { type: 'tv', title: '1899', year: 2022, genre: 'Mystery', rating: 5 },
    { type: 'tv', title: 'Hannibal', year: 2013, genre: 'Crime', rating: 4 },
    { type: 'tv', title: 'Silo', year: 2023, genre: 'Sci-fi', rating: 4 },
    {
      type: 'tv',
      title: 'Yellowstone',
      year: 2018,
      genre: 'Western',
      rating: 5,
    },
    { type: 'tv', title: 'Godless', year: 2017, genre: 'Western', rating: 5 },
    {
      type: 'tv',
      title: 'American Primeval',
      year: 2025,
      genre: 'Western',
      rating: 4,
    },
    { type: 'tv', title: 'The Office', year: 2005, genre: 'Comedy', rating: 5 },
    {
      type: 'tv',
      title: 'Mr. Robot',
      year: 2015,
      genre: 'Thriller',
      rating: 5,
    },
    { type: 'tv', title: 'Fargo', year: 2014, genre: 'Crime', rating: 4.5 },
    {
      type: 'tv',
      title: 'The Sopranos',
      year: 1999,
      genre: 'Crime',
      rating: 4.5,
    },
    {
      type: 'tv',
      title: 'Breaking Bad',
      year: 2008,
      genre: 'Crime',
      rating: 5,
    },
    { type: 'tv', title: 'Ozark', year: 2017, genre: 'Crime', rating: 5 },
    { type: 'tv', title: 'Narcos', year: 2015, genre: 'Crime', rating: 5 },
    { type: 'tv', title: 'The Penguin', year: 2024, genre: 'Crime', rating: 4 },
    {
      type: 'tv',
      title: 'Stranger Things',
      year: 2016,
      genre: 'Sci-fi',
      rating: 5,
    },
    {
      type: 'tv',
      title: 'The Witcher',
      year: 2019,
      genre: 'Fantasy',
      rating: 4.5,
    },
    {
      type: 'tv',
      title: 'Chernobyl',
      year: 2019,
      genre: 'History',
      rating: 4.5,
    },
    {
      type: 'tv',
      title: 'Game of Thrones',
      year: 2011,
      genre: 'Fantasy',
      rating: 4.5,
    },
    {
      type: 'tv',
      title: 'The Last of Us',
      year: 2023,
      genre: 'Adventure',
      rating: 3.5,
    },
    {
      type: 'tv',
      title: 'The Walking Dead',
      year: 2010,
      genre: 'Horror',
      rating: 4.5,
    },
    { type: 'tv', title: 'The Boys', year: 2019, genre: 'Action', rating: 4.5 },
    {
      type: 'tv',
      title: 'The Agency',
      year: 2024,
      genre: 'Thriller',
      rating: 4.5,
    },
  ];

  const TYPE_NAME = { book: 'Book', movie: 'Movie', tv: 'TV show' };
  const TONES = [
    '#34405a',
    '#5a3446',
    '#2f5246',
    '#5a4c30',
    '#46345a',
    '#5a3a30',
    '#304a5a',
    '#4a5a30',
  ];
  // Animations play for everyone, even with "reduce motion" turned on (Ned's call)
  const reduceMotion = { matches: false };

  /*---------- stats line ----------*/
  function renderStats() {
    const el = document.getElementById('favStats');
    if (!el) return;
    const count = (t) => FAVORITES.filter((f) => f.type === t).length;
    const directors = {};
    FAVORITES.forEach((f) => {
      if (f.type === 'movie' && f.by)
        directors[f.by] = (directors[f.by] || 0) + 1;
    });
    const top = Object.keys(directors).sort(
      (a, b) => directors[b] - directors[a],
    )[0];
    const part = (n, word) => `<span><b>${n}</b> ${word}</span>`;
    el.innerHTML =
      part(count('movie'), 'movies') +
      part(count('tv'), 'shows') +
      part(count('book'), 'books') +
      (top
        ? `<span>Most-watched director: <strong>${escapeHTML(top)}</strong> (${directors[top]})</span>`
        : '');
  }

  /*---------- cards ----------*/
  // Five stars filled to the exact rating: each star is filled by how much of
  // it the rating covers, so 4.8 is four stars and 80% of the fifth, and 3.2
  // is three stars and a sliver (no rounding to halves)
  // The fill is cut by how much of the star's shape is covered, not just its
  // width: a star's tips are thin, so cutting 80% of the width still looks
  // like a full star. (Inverse of a smoothstep, a close match for a star's
  // area; the glyph's ink spans about 4% to 96% of its box.)
  function starFill(rating, i) {
    const f = Math.max(0, Math.min(1, rating - (i - 1)));
    if (f === 0 || f === 1) return f * 100;
    const x = 0.5 - Math.sin(Math.asin(1 - 2 * f) / 3);
    return Math.round(4 + 92 * x);
  }
  // a short verdict from the rating (home card and the Lab's receipts)
  function verdict(r) {
    return r >= 4.5 ? 'Must watch' : r >= 4 ? 'Really good' : r >= 3.5 ? 'Worth a watch' : r >= 3 ? 'Just okay' : r >= 2 ? 'Skip it' : 'Avoid';
  }

  function starsHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<span class="fav-star" style="--f:${starFill(rating, i)}%" aria-hidden="true">★</span>`;
    }
    return `<span class="fav-stars" title="${rating} out of 5">${html}</span>`;
  }

  function escapeHTML(s) {
    return String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[c],
    );
  }

  const cards = [];
  // Shelves: rows you swipe sideways, one per genre (biggest first), best
  // rated first in each. Genres with only a couple of titles share an
  // "Everything else" shelf at the end; if no genre has enough (books), it's
  // one shelf. The shelves are rebuilt for each filter. (Without JS the
  // plain list in the page shows instead.)
  const MIN_SHELF = 3;
  const TYPE_PLURAL = { all: 'favorites', movie: 'movies', tv: 'shows', book: 'books' };
  let SHELVES = [];
  let shelfIO = null;
  const parked = document.createElement('div'); // cards the filter hides wait here
  parked.hidden = true;
  // the genre menu next to the type menu: "Any genre" shows every shelf,
  // a genre shows just its own
  const genreSelect = document.getElementById('favGenre');
  let genre = 'any';
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // "Ned's 5 stars": a slim row of the must-watches (and must-reads) at the
  // top, for whatever's being shown. Tapping one is like tapping its poster.
  let topRow = null;
  function buildTopRow(shown) {
    if (topRow) topRow.remove();
    const top = shown.filter((c) => c.rating >= 5 && c.fav.type !== 'book').sort((a, b) => (b.fav.year || 0) - (a.fav.year || 0));
    if (top.length < 3) { topRow = null; return; }
    topRow = document.createElement('section');
    topRow.className = 'fav-top';
    topRow.innerHTML = `<div class="fav-shelf-head"><h2 class="fav-shelf-title">Ned's 5 stars</h2><span class="fav-shelf-count">${top.length}</span></div><div class="fav-top-row"></div>`;
    const row = topRow.querySelector('.fav-top-row');
    top.forEach((c) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'fav-top-item';
      b.setAttribute('aria-label', `${c.fav.title}, 5 stars`);
      b.innerHTML = `<img alt="" width="92" height="138" loading="lazy"><span>${escapeHTML(c.fav.title)}</span>`;
      const img = b.querySelector('img');
      coverFor(c.fav).then((url) => { if (url) { img.onload = () => b.classList.add('has-cover'); img.src = url; } }).catch(() => {});
      b.addEventListener('click', () => {
        b.classList.remove('is-tapped'); void b.offsetWidth; b.classList.add('is-tapped');
        c.el.click();
      });
      row.append(b);
    });
    grid.prepend(topRow);
  }
  function makeShelf(name, list) {
    const s = { name, cards: list.map((c) => c.el) };
    s.el = document.createElement('section');
    s.el.className = 'fav-shelf';
    s.el.innerHTML = `
      <div class="fav-shelf-head">
        <h2 class="fav-shelf-title"></h2>
        <span class="fav-shelf-count"></span>
        <span class="fav-shelf-nav">
          <button type="button" class="fav-shelf-btn" data-dir="-1" aria-label="Scroll back">&larr;</button>
          <button type="button" class="fav-shelf-btn" data-dir="1" aria-label="Scroll on">&rarr;</button>
        </span>
      </div>
      <div class="fav-row"></div>`;
    s.el.querySelector('.fav-shelf-title').textContent = name;
    s.el.querySelector('.fav-shelf-count').textContent = list.length;
    s.row = s.el.querySelector('.fav-row');
    list.forEach((c) => { c.shelf = s; s.row.appendChild(c.el); });
    // arrows for mouse users: a screenful at a time, greyed out at either end
    const [back, on] = s.el.querySelectorAll('.fav-shelf-btn');
    s.ends = () => {
      const max = s.row.scrollWidth - s.row.clientWidth;
      back.disabled = s.row.scrollLeft <= 2;
      on.disabled = s.row.scrollLeft >= max - 2;
      s.el.classList.toggle('is-scrollable', max > 2);
      s.el.classList.toggle('is-end', s.row.scrollLeft >= max - 2);
    };
    [back, on].forEach((btn) => btn.addEventListener('click', () => {
      s.row.scrollBy({ left: Number(btn.dataset.dir) * s.row.clientWidth * .85, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }));
    s.row.addEventListener('scroll', s.ends, { passive: true });
    return s;
  }
  function layoutShelves() {
    if (shelfIO) shelfIO.disconnect();
    SHELVES.forEach((s) => s.el.remove());
    const ofType = cards.filter((c) => filter === 'all' || c.fav.type === filter);
    // the genre menu lists this type's genres, biggest first, with counts
    const counts = new Map();
    ofType.forEach((c) => { const g = c.fav.genre || 'Other'; counts.set(g, (counts.get(g) || 0) + 1); });
    if (genre !== 'any' && !counts.has(genre)) genre = 'any';
    genreSelect.replaceChildren(new Option('Any genre', 'any'),
      ...[...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([g, n]) => {
        const o = new Option(`${g} (${n})`, g);
        o.dataset.label = o.textContent;
        return o;
      }));
    genreSelect.value = genre;
    // the chosen genre shows just its name: its count is already on the shelf
    [...genreSelect.options].forEach((o) => { o.textContent = o.value === 'any' || o.value !== genre ? o.dataset.label || o.textContent : o.value; });
    const shown = genre === 'any' ? ofType : ofType.filter((c) => (c.fav.genre || 'Other') === genre);
    cards.forEach((c) => { if (!shown.includes(c)) { c.shelf = null; parked.appendChild(c.el); } });
    const byGenre = new Map();
    shown.forEach((c) => {
      const g = c.fav.genre || 'Other';
      if (!byGenre.has(g)) byGenre.set(g, []);
      byGenre.get(g).push(c);
    });
    const best = (a, b) => b.rating - a.rating || (b.fav.year || 0) - (a.fav.year || 0);
    const min = genre === 'any' ? MIN_SHELF : 1; // a chosen genre always gets its own shelf
    const big = [...byGenre].filter(([, l]) => l.length >= min).sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
    const rest = [...byGenre].filter(([, l]) => l.length < min).flatMap(([, l]) => l);
    SHELVES = big.length
      ? big.map(([g, l]) => makeShelf(g, l.sort(best)))
      : [];
    if (rest.length) SHELVES.push(makeShelf(big.length ? 'Everything else' : `All ${TYPE_PLURAL[filter]}`, rest.sort(best)));
    SHELVES.forEach((s) => { grid.appendChild(s.el); s.ends(); });
    buildTopRow(shown);
    // each shelf rises in as it's scrolled to, its posters fanning in after
    if (!still && 'IntersectionObserver' in window) {
      SHELVES.forEach((s) => {
        s.el.classList.add('will-rise');
        [...s.row.children].forEach((c, k) => c.style.setProperty('--k', Math.min(k, 8)));
      });
    }
    // covers load a shelf at a time as each comes near the screen (cards
    // further along a row are scrolled out of sight, so watching single
    // cards would miss them)
    if ('IntersectionObserver' in window) {
      shelfIO = new IntersectionObserver((entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        shelfIO.unobserve(e.target);
        const shelf = e.target;
        const rise = new IntersectionObserver(([r]) => {
          if (!r.isIntersecting) return;
          rise.disconnect();
          shelf.classList.add('is-risen');
          // done: drop the classes so hover and flips behave as before
          setTimeout(() => shelf.classList.remove('will-rise', 'is-risen'), 1700);
        }, { threshold: .15 });
        if (shelf.classList.contains('will-rise')) rise.observe(shelf);
        cards.filter((c) => c.shelf && c.shelf.el === e.target).forEach(requestCover);
      }), { rootMargin: '400px 0px' });
      SHELVES.forEach((s) => shelfIO.observe(s.el));
    } else shown.forEach(requestCover);
  }
  addEventListener('resize', () => SHELVES.forEach((s) => s.ends()));
  function buildCards() {
    grid.classList.replace('fav-grid', 'fav-shelves');
    grid.appendChild(parked);
    // movies, then TV shows (each newest first, same year A to Z), then books in list order
    const TYPE_ORDER = { movie: 0, tv: 1, book: 2 };
    const sorted = FAVORITES.map((f, i) => ({ f, i }))
      .sort(
        (a, b) =>
          TYPE_ORDER[a.f.type] - TYPE_ORDER[b.f.type] ||
          (b.f.year || 0) - (a.f.year || 0) ||
          (a.f.type === 'book'
            ? a.i - b.i
            : a.f.title.localeCompare(b.f.title, 'en')),
      )
      .map((x) => x.f);
    sorted.forEach((f, i) => {
      const rating = Math.max(0, Math.min(5, Number(f.rating) || 0)); // always a number from 0 to 5

      const card = document.createElement('div');
      card.setAttribute('role', 'button');
      card.tabIndex = 0;
      card.className = 'fav-card';
      card.dataset.type = f.type;
      card.setAttribute('aria-pressed', 'false');
      card.setAttribute(
        'aria-label',
        `${f.title}, ${TYPE_NAME[f.type]}, rated ${rating} out of 5`,
      );
      const meta = [TYPE_NAME[f.type], f.year, f.genre]
        .filter(Boolean)
        .join(' · ');
      const by = f.by ? (f.type === 'book' ? 'by ' : 'dir. ') + f.by : '';
      card.innerHTML = `
        <span class="fav-inner">
          <span class="fav-face fav-front" style="background-color:${TONES[i % TONES.length]}">
            <span class="fav-placeholder-title">${escapeHTML(f.title)}</span>
            <img class="fav-cover" alt="" decoding="async">
            <span class="fav-score">★ ${rating}</span>
          </span>
          <span class="fav-face fav-back">
            <span class="fav-back-title">${escapeHTML(f.title)}</span>
            <span class="fav-back-meta">${escapeHTML(meta)}</span>
            ${by ? `<span class="fav-back-meta">${escapeHTML(by)}</span>` : ''}
            ${starsHTML(rating)}
            ${f.take ? `<span class="fav-take">${escapeHTML(f.take)}</span>` : ''}
          </span>
        </span>`;
      const item = { el: card, fav: f, rating, shelf: null };
      // tap: picks it, so it shows big in the preview; tap it again (or
      // "See details") and the details panel slides up
      const open = () => {
        if (picking) return;
        // a quick press-in bounce on the poster you tapped
        card.classList.remove('is-tapped'); void card.offsetWidth; card.classList.add('is-tapped');
        if (hero && current !== item) {
          select(item);
          // the preview is scrolled away: on phones the mini player pinned to
          // the top already shows the pick and plays its trailer; elsewhere
          // the details panel opens here
          if (!heroInView() && !hero.classList.contains('is-mini')) openSheet(item);
        } else openSheet(item);
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
      cards.push(item);
    });
    layoutShelves();
  }

  // an open card flips back to its cover on its own after 10 seconds
  const AUTO_FLIP_BACK_MS = 10000;
  function setFlipped(card, on) {
    clearTimeout(card.flipBackTimer);
    card.classList.toggle('is-flipped', on);
    card.setAttribute('aria-pressed', String(on));
    if (on)
      card.flipBackTimer = setTimeout(
        () => setFlipped(card, false),
        AUTO_FLIP_BACK_MS,
      );
  }

  /*---------- summaries and backdrops ----------*/
  // What each title is about, for the details panel and the banner: TMDB's
  // overview (and its wide backdrop image) for movies and shows, Open
  // Library's description for books. Looked up only when needed, then kept
  // in this browser for a month.
  const INFO_CACHE_KEY = 'nedcode-fav-info-v1';
  let infoCache = {};
  try { infoCache = JSON.parse(localStorage.getItem(INFO_CACHE_KEY)) || {}; } catch (e) { infoCache = {}; }
  const plain = (t) => String(t || '').replace(/\s+/g, ' ').trim();
  async function findScreenInfo(f) {
    const kind = f.type === 'tv' ? 'tv' : 'movie';
    const base = '/.netlify/functions/tmdb';
    let hit;
    if (f.tmdbId) hit = await getJSON(`${base}?kind=${kind}&id=${encodeURIComponent(f.tmdbId)}`);
    else {
      const query = `q=${encodeURIComponent(f.title)}`;
      let data = await getJSON(`${base}?kind=${kind}&${query}${f.year ? `&year=${f.year}` : ''}`);
      hit = (data.results || []).find((r) => r.poster_path);
      if (!hit && f.year) {
        data = await getJSON(`${base}?kind=${kind}&${query}`);
        hit = (data.results || []).find((r) => r.poster_path);
      }
    }
    if (!hit) return { summary: '', backdrop: '' };
    const tmdb = /^\d{1,10}$/.test(String(hit.id)) ? String(hit.id) : '';
    const back = typeof hit.backdrop_path === 'string' && /^\/[A-Za-z0-9._-]+$/.test(hit.backdrop_path) ? hit.backdrop_path : '';
    return { summary: plain(hit.overview), backdrop: back ? `https://image.tmdb.org/t/p/w1280${back}` : '', tmdb, kind };
  }
  async function findBookInfo(f) {
    const q = `title=${encodeURIComponent(f.title)}` + (f.by ? `&author=${encodeURIComponent(f.by)}` : '');
    const data = await getJSON(`https://openlibrary.org/search.json?${q}&limit=1&fields=key,first_sentence`);
    const doc = (data.docs || [])[0];
    if (!doc) return { summary: '', backdrop: '' };
    let summary = '';
    if (/^\/works\/OL\d+W$/.test(doc.key || '')) {
      const work = await getJSON(`https://openlibrary.org${doc.key}.json`);
      const d = work.description;
      summary = plain(typeof d === 'string' ? d : d && d.value);
      summary = summary.split(/\s*(?:-{3,}|\[source\]|\(\[source\])/i)[0]; // drop trailing notes and links
    }
    if (!summary && doc.first_sentence) summary = plain([].concat(doc.first_sentence)[0]);
    return { summary, backdrop: '' };
  }
  // The official YouTube trailer of a movie or show (TMDB lists them),
  // as its 11-character video id; '' when there isn't one. Kept a month.
  const TRAILER_KEY = 'nedcode-fav-trailers-v1';
  let trailers = {};
  try { trailers = JSON.parse(localStorage.getItem(TRAILER_KEY)) || {}; } catch (e) { trailers = {}; }
  async function trailerFor(f) {
    if (f.type === 'book') return '';
    const id = cacheId(f), hit = trailers[id];
    if (hit && Date.now() - hit.t < 30 * 86400000) return hit.v;
    const info = await infoFor(f);
    let v = '';
    if (info.tmdb) {
      const data = await getJSON(`/.netlify/functions/tmdb?kind=${info.kind || 'movie'}&id=${info.tmdb}&videos=1`);
      const yt = (data.results || []).filter((r) => r.site === 'YouTube' && /^[\w-]{11}$/.test(r.key || ''));
      const best = yt.find((r) => r.type === 'Trailer' && r.official) || yt.find((r) => r.type === 'Trailer') || yt.find((r) => r.type === 'Teaser');
      v = best ? best.key : '';
    }
    trailers[id] = { v, t: Date.now() };
    try { localStorage.setItem(TRAILER_KEY, JSON.stringify(trailers)); } catch (e) {}
    return v;
  }
  async function infoFor(f) {
    const id = cacheId(f);
    const hit = infoCache[id];
    if (hit && Date.now() - hit.t < 30 * 86400000 && (f.type === 'book' || 'tmdb' in hit)) return hit;
    const info = f.type === 'book' ? await findBookInfo(f) : await findScreenInfo(f);
    infoCache[id] = { ...info, t: Date.now() };
    try { localStorage.setItem(INFO_CACHE_KEY, JSON.stringify(infoCache)); } catch (e) {}
    return info;
  }

  /*---------- details panel ----------*/
  // Tapping a poster slides up a panel from the bottom (a centred card on
  // desktop): a big poster, what it is, the stars and the take. Close with
  // the x, a tap outside, Esc or the phone's back swipe of the panel.
  let sheet = null;
  let lastFocus = null;
  // the orange slash sits behind the poster and ends just past its edge, so
  // the title, year and rating beside it always stay on the dark background
  // (at some widths it reached under the year, grey on orange)
  function fitSlash(slash, poster) {
    if (!slash || !poster || !('ResizeObserver' in window)) return;
    const fit = () => {
      const pr = poster.getBoundingClientRect();
      if (!pr.width) return;
      slash.style.width = '';
      const sr = slash.getBoundingClientRect(); // includes the skew
      const want = slash.offsetWidth - (sr.right - (pr.right + 12)); // a thin angled sliver past the poster
      if (want < slash.offsetWidth) slash.style.width = `${Math.max(0, Math.round(want))}px`;
    };
    const ro = new ResizeObserver(() => requestAnimationFrame(fit));
    ro.observe(poster);
    ro.observe(slash.parentElement);
  }
  function buildSheet() {
    sheet = document.createElement('div');
    sheet.className = 'fav-sheet';
    sheet.hidden = true;
    sheet.innerHTML = `
      <div class="fav-sheet-shade" data-close></div>
      <div class="fav-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="favSheetTitle">
        <button type="button" class="fav-sheet-x" data-close aria-label="Close">&times;</button>
        <span class="fav-sheet-grab" aria-hidden="true"></span>
        <span class="fav-sheet-slash" aria-hidden="true"></span>
        <div class="fav-sheet-body">
          <span class="fav-sheet-poster"><img alt="" width="342" height="513"></span>
          <div class="fav-sheet-info">
            <span class="fav-sheet-kicker"></span>
            <h2 class="fav-sheet-title" id="favSheetTitle"></h2>
            <span class="fav-sheet-meta"></span>
            <span class="fav-sheet-by"></span>
            <span class="fav-sheet-rate"><b class="fav-sheet-num"></b><span class="fav-sheet-stars"></span><span class="fav-sheet-verdict"></span></span>
          </div>
        </div>
        <p class="fav-sheet-sum"></p>
      </div>`;
    document.body.appendChild(sheet);
    fitSlash(sheet.querySelector('.fav-sheet-slash'), sheet.querySelector('.fav-sheet-poster'));
    sheet.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeSheet(); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });
    // swipe the panel down to close it (phones)
    const panel = sheet.querySelector('.fav-sheet-panel');
    // swipe it left or right for the next or previous title on that shelf:
    // the details follow your finger, slide off, and the next title's slide
    // in from the other side (the trailer above moves along with them)
    let hx = null, hy = 0, side = null, hdx = 0;
    const parts = () => [...panel.querySelectorAll('.fav-sheet-body, .fav-sheet-sum')];
    const slide = (dx, ms) => {
      const k = Math.min(1, Math.abs(dx) / 260);
      parts().forEach((el) => {
        el.style.transition = ms ? `transform ${ms}ms cubic-bezier(.22, 1, .36, 1), opacity ${ms}ms` : 'none';
        el.style.transform = dx ? `translateX(${dx}px)` : '';
        el.style.opacity = dx ? String(1 - k * .8) : '';
      });
      const tv = hero && hero.classList.contains('is-docked') ? hero.querySelector('.fav-hero-video') : null;
      if (tv) {
        tv.style.transition = ms ? `transform ${ms}ms cubic-bezier(.22, 1, .36, 1), opacity ${ms}ms` : 'none';
        tv.style.transform = dx ? `translateX(${dx * .35}px)` : '';
        tv.style.opacity = dx ? String(1 - k * .6) : '';
      }
    };
    panel.addEventListener('touchstart', (e) => { hx = e.touches[0].clientX; hy = e.touches[0].clientY; side = null; hdx = 0; }, { passive: true });
    panel.addEventListener('touchmove', (e) => {
      if (hx === null) return;
      const dx = e.touches[0].clientX - hx, dy = e.touches[0].clientY - hy;
      if (side === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) side = Math.abs(dx) > Math.abs(dy) * 1.2;
      if (!side) return;
      hdx = dx;
      slide(dx, 0);
    }, { passive: true });
    panel.addEventListener('touchend', () => {
      if (hx === null) return;
      hx = null;
      if (!side) return;
      const dir = hdx < 0 ? 1 : -1;
      if (Math.abs(hdx) > 70 && canStep(dir)) {
        slide(-dir * innerWidth * .6, 180);
        setTimeout(() => {
          stepSheet(dir);
          slide(dir * innerWidth * .45, 0); // the new one waits just off the other side
          requestAnimationFrame(() => requestAnimationFrame(() => slide(0, 380)));
          setTimeout(() => slide(0, 0), 420);
        }, 180);
      } else {
        slide(0, 300);
        setTimeout(() => slide(0, 0), 320);
      }
    });
    // swipe down anywhere on the screen while the details are open (the
    // panel, the trailer above it or the dimmed page) and it all slides away
    // together. Inside the panel, only once its text is scrolled to the top.
    let y0 = null, x0 = 0, dragY = 0, vertical = null, lastY = 0, lastT = 0, speed = 0;
    const tvOf = () => hero && hero.classList.contains('is-docked') ? hero.querySelector('.fav-hero-tv') : null;
    const shade = () => sheet.querySelector('.fav-sheet-shade');
    // like YouTube: as you pull down, the trailer shrinks toward the spot it
    // goes back to (the mini player in the corner, or the banner), the
    // details slide down and fade, and the page shows through; let go and it
    // finishes the move (or springs back if you didn't pull far)
    let base = null, target = null;
    const follow = (dy, ease) => {
      const t = ease || 'none';
      const p = Math.min(1, dy / (innerHeight * .5));
      panel.style.transition = t === 'none' ? 'none' : `transform ${t}, opacity ${t}`;
      panel.style.transform = dy ? `translateY(${dy * 1.15}px)` : '';
      panel.style.opacity = dy ? String(Math.max(0, 1 - p * 1.1)) : '';
      const tv = tvOf();
      if (tv && base && target) {
        const k = 1 + (target.w / base.width - 1) * p;
        tv.style.transformOrigin = '0 0';
        tv.style.transition = t === 'none' ? 'none' : `transform ${t}`;
        tv.style.transform = dy ? `translate(${(target.x - base.left) * p}px, ${(target.y - base.top) * p}px) scale(${k})` : '';
      }
      const sh = shade();
      sh.style.transition = t === 'none' ? 'none' : `opacity ${t}`;
      sh.style.opacity = dy ? String(Math.max(0, 1 - p)) : '';
    };
    const clearFollow = () => {
      panel.style.transition = panel.style.transform = panel.style.opacity = '';
      const sh = shade(); sh.style.transition = sh.style.opacity = '';
      const tv = hero && hero.querySelector('.fav-hero-tv');
      if (tv) tv.style.transition = tv.style.transform = tv.style.transformOrigin = '';
    };
    // listening only on the details (and the trailer docked over them), not
    // the whole page: a page-wide touch listener that can block scrolling
    // made iPhones hesitate on every scroll
    let moveFrame = 0;
    const onStart = (e) => {
      if (sheet.hidden || !sheet.classList.contains('is-open')) return;
      const inPanel = panel.contains(e.target);
      if (inPanel && panel.scrollTop > 0) { y0 = null; return; }
      y0 = lastY = e.touches[0].clientY; x0 = e.touches[0].clientX; dragY = 0; vertical = null;
      lastT = performance.now(); speed = 0;
      panel.style.willChange = 'transform';
      const tv = tvOf();
      base = tv ? tv.getBoundingClientRect() : null;
      target = tv && hero.closeTarget ? hero.closeTarget() : null;
    };
    const onMove = (e) => {
      if (y0 === null) return;
      const y = e.touches[0].clientY;
      const dy = y - y0, dx = e.touches[0].clientX - x0;
      if (vertical === null && (Math.abs(dy) > 8 || Math.abs(dx) > 8)) vertical = Math.abs(dy) > Math.abs(dx);
      if (!vertical) return;
      const now = performance.now();
      speed = .7 * speed + .3 * ((y - lastY) / Math.max(1, now - lastT)); // px per ms, smoothed
      lastY = y; lastT = now;
      const pull = Math.max(0, dy);
      dragY = pull;
      if (pull && e.cancelable) e.preventDefault();
      // one style update per screen frame, however fast the touch events come
      if (!moveFrame) moveFrame = requestAnimationFrame(() => { moveFrame = 0; if (y0 !== null) follow(dragY); });
    };
    const onEnd = () => {
      if (y0 === null) return;
      y0 = null;
      cancelAnimationFrame(moveFrame); moveFrame = 0;
      panel.style.willChange = '';
      if (!vertical) return;
      // a long enough pull, or a quick flick down, closes it
      if (dragY > 120 || (speed > .5 && dragY > 40)) {
        // finish the move at about the speed you flicked it: the trailer lands
        // in its spot, then the page takes over from there with no jump
        const ms = Math.round(Math.min(380, Math.max(220, 360 - speed * 120)));
        follow(innerHeight * .5, `${ms}ms cubic-bezier(.2, .8, .3, 1)`);
        setTimeout(() => {
          if (hero) hero.skipGlide = true;
          closeSheet();
          clearFollow();
        }, ms);
      } else {
        // not far enough: it settles back with a gentle spring
        follow(0, '.42s cubic-bezier(.3, 1.3, .5, 1)');
        setTimeout(clearFollow, 440);
      }
    };
    const tvTarget = hero && hero.querySelector('.fav-hero-tv');
    [sheet, tvTarget].filter(Boolean).forEach((el) => {
      el.addEventListener('touchstart', onStart, { passive: true });
      el.addEventListener('touchmove', onMove, { passive: false });
      el.addEventListener('touchend', onEnd);
      el.addEventListener('touchcancel', onEnd);
    });
  }
  let sheetItem = null;
  const neighbour = (dir) => {
    if (!sheetItem) return null;
    let el = sheetItem.el;
    do el = dir > 0 ? el.nextElementSibling : el.previousElementSibling;
    while (el && (!el.classList.contains('fav-card') || !el.offsetParent));
    return el && cards.find((c) => c.el === el);
  };
  const canStep = (dir) => !!neighbour(dir);
  function stepSheet(dir) {
    const next = neighbour(dir);
    if (!next) return;
    if (hero) select(next);
    openSheet(next);
  }
  function openSheet(item) {
    if (!item) return;
    sheetItem = item;
    if (!sheet) buildSheet();
    const f = item.fav;
    const q = (c) => sheet.querySelector(c);
    q('.fav-sheet-kicker').textContent = `P1 · ${TYPE_NAME[f.type]}`;
    q('.fav-sheet-title').textContent = f.title;
    q('.fav-sheet-meta').textContent = [f.year, f.genre].filter(Boolean).join(' · ');
    q('.fav-sheet-by').textContent = f.by ? (f.type === 'book' ? 'by ' : 'Directed by ') + f.by : '';
    q('.fav-sheet-num').textContent = item.rating;
    q('.fav-sheet-stars').innerHTML = starsHTML(item.rating);
    q('.fav-sheet-verdict').textContent = verdict(item.rating).replace(/watch/, f.type === 'book' ? 'read' : 'watch');
    // what it's about (looked up the first time it's opened)
    const sum = q('.fav-sheet-sum');
    sum.textContent = '';
    sum.classList.add('is-loading');
    infoFor(f).then((info) => {
      if (q('.fav-sheet-title').textContent !== f.title) return;
      sum.textContent = info.summary || '';
    }).catch(() => {}).finally(() => sum.classList.remove('is-loading'));
    const poster = q('.fav-sheet-poster');
    const img = poster.querySelector('img');
    poster.style.backgroundColor = item.el.querySelector('.fav-front').style.backgroundColor;
    poster.classList.remove('has-cover');
    img.removeAttribute('srcset');
    img.removeAttribute('src');
    coverFor(f).then((url) => {
      if (!url || q('.fav-sheet-title').textContent !== f.title) return;
      img.onload = () => poster.classList.add('has-cover');
      const set = coverSrcset(url);
      if (set) { img.sizes = '(min-width: 768px) 240px, 40vw'; img.srcset = set; }
      img.src = url;
    }).catch(() => {});
    lastFocus = document.activeElement;
    sheet.hidden = false;
    document.documentElement.classList.add('fav-sheet-open');
    requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add('is-open')));
    q('.fav-sheet-x').focus({ preventScroll: true });
    if (hero && hero.dock) hero.dock(item);
  }
  function closeSheet() {
    sheet.classList.remove('is-open');
    document.documentElement.classList.remove('fav-sheet-open');
    setTimeout(() => { if (!sheet.classList.contains('is-open')) sheet.hidden = true; }, 320);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
    if (hero && hero.undock) hero.undock();
  }

  /*---------- the select screen's big preview ----------*/
  // Like a fighting game's character select: the poster you pick lights up
  // in the grid (with a P1 tag) and shows big up here, with its stars, its
  // summary (desktop) and a button to its details. Picked further down, with
  // the preview scrolled away, the details panel opens instead. It starts on
  // There Will Be Blood.
  // the banner always opens on There Will Be Blood (any movie if it's ever removed)
  const FEATURED = FAVORITES.find((f) => f.title === 'There Will Be Blood') || FAVORITES.find((f) => f.type === 'movie');
  let hero = null;
  let current = null;
  let paintId = 0;
  function buildBanner() {
    const bar = document.querySelector('.fav-bar');
    const item = cards.find((c) => c.fav === FEATURED);
    if (!bar || !item) return;
    hero = document.createElement('div');
    hero.className = 'fav-hero';
    hero.setAttribute('aria-live', 'polite');
    hero.innerHTML = `
      <span class="fav-hero-bg" aria-hidden="true"></span>
      <div class="fav-hero-screen">
        <div class="fav-hero-tv">
          <span class="fav-hero-video" aria-hidden="true"></span>
          <span class="fav-hero-onair" aria-hidden="true">TRAILER</span>
          <button type="button" class="fav-hero-play">TAP TO PLAY</button>
          <button type="button" class="fav-hero-mini-info" aria-label="See details"><b class="fav-hero-mini-title"></b><small class="fav-hero-mini-rate"></small></button>
          <button type="button" class="fav-hero-sound" aria-pressed="false" aria-label="Turn trailer sound on"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="fhs-spk" d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path class="fhs-on" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/><path class="fhs-off" d="M16 9.5l5 5M21 9.5l-5 5"/></svg></button>
          <button type="button" class="fav-hero-mini-x" aria-label="Close the mini player"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg></button>
        </div>
      </div>
      <span class="fav-hero-slash" aria-hidden="true"></span>
      <span class="fav-hero-poster"><img alt="" width="342" height="513"></span>
      <div class="fav-hero-info">
        <span class="fav-hero-kicker"></span>
        <h2 class="fav-hero-title"></h2>
        <span class="fav-hero-meta"></span>
        <span class="fav-hero-rate"></span>
        <p class="fav-hero-sum"></p>
        <button type="button" class="fav-hero-go">See details</button>
      </div>`;
    bar.after(hero);
    fitSlash(hero.querySelector('.fav-hero-slash'), hero.querySelector('.fav-hero-poster'));
    // the banner pins just under the sticky menus (desktop): keep that gap exact
    const barH = () => hero.style.setProperty('--fav-bar-h', `${bar.offsetHeight}px`);
    barH(); addEventListener('resize', barH);
    // computers: once the banner is pinned, the posters scrolling under it
    // fade out into the page instead of being cut by its bottom edge
    let stuck = false, stuckFrame = 0;
    const checkStuck = () => {
      stuckFrame = 0;
      const now = wide.matches && grid.getBoundingClientRect().top < hero.getBoundingClientRect().bottom; // posters are passing under it
      if (now !== stuck) { stuck = now; hero.classList.toggle('is-stuck', now); }
    };
    addEventListener('scroll', () => { if (!stuckFrame) stuckFrame = requestAnimationFrame(checkStuck); }, { passive: true });
    hero.querySelector('.fav-hero-go').addEventListener('click', () => current && openSheet(current));
    // the whole banner opens the details too (its own buttons keep their jobs)
    hero.setAttribute('role', 'button');
    hero.tabIndex = 0;
    hero.setAttribute('aria-label', 'See details');
    hero.addEventListener('click', (e) => {
      if (e.target.closest('button, a') || hero.classList.contains('is-docked') || !current) return;
      openSheet(current);
    });
    hero.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target === hero && current) { e.preventDefault(); openSheet(current); }
    });
    hero.querySelector('.fav-hero-sound').addEventListener('click', () => {
      soundOn = !soundOn;
      try { soundOn ? localStorage.setItem(SOUND_KEY, '1') : localStorage.removeItem(SOUND_KEY); } catch (e) {}
      paintSound(); applySound();
    });
    paintSound();
    // the phone wouldn't start it by itself (Low Power Mode does this): a tap
    // on the picture plays it
    hero.querySelector('.fav-hero-play').addEventListener('click', () => {
      hero.classList.remove('needs-tap');
      hero.classList.add('is-tuning');
      ytCommand('playVideo');
      clearTimeout(hero.tapTimer);
      hero.tapTimer = setTimeout(() => {
        const fr = hero.querySelector('.fav-hero-video iframe');
        if (fr && !fr.playing) { hero.classList.remove('is-tuning'); hero.classList.add('needs-tap'); }
      }, 6000);
    });
    setupMini();
    select(item);
  }
  // Phones and upright tablets: the trailer plays in a wide frame on top of
  // the banner. Scroll past it and it shrinks into a mini player pinned to
  // the top of the screen (the same player, so it keeps playing), with the
  // title next to it: tap it to go back up, or close it.
  let miniClosed = false;
  // While a trailer shows, the site's screen effect (scanlines, edge fade)
  // gets a hole cut exactly where the video is, so it plays clean and sharp
  // (css: "the trailer hole"). Kept in place as you scroll.
  const root = document.documentElement;
  const holeVars = ['--hole-x', '--hole-y', '--hole-w', '--hole-h'];
  let holeFrame = 0;
  let holeSettle = 0;
  let lastHole = null;
  const holeSheet = document.head.appendChild(document.createElement('style'));
  holeSheet.textContent = 'html::after, body::after {}';
  const holeRule = holeSheet.sheet.cssRules[0];
  function placeHole() {
    holeFrame = 0;
    // phones: the player is always drawn 640 px wide and scaled to fit the
    // frame or the mini player, so YouTube never re-lays it out (that brings
    // its title and buttons back) and its overlays stay small
    const box = hero && hero.querySelector('.fav-hero-video');
    if (box && box.offsetWidth) box.style.setProperty('--yt-scale', (box.offsetWidth / 640 * 1.36).toFixed(4));
    const slot = hero && hero.classList.contains('has-video') && !miniClosed && box;
    const r = slot && slot.getBoundingClientRect();
    // only touch the page's styles when the spot actually moved: each change
    // makes the browser restyle the whole page, which made scrolling lag
    const key = r && r.width && r.bottom >= 0 && r.top <= innerHeight ? [r.left, r.top, r.width, r.height].map(Math.round).join() : '';
    if (key === lastHole) return;
    const moving = !!(lastHole && key); // it was cut and the trailer moved
    lastHole = key;
    clearTimeout(holeSettle);
    // the screen effect only uses its (costly) masks while there's a hole to
    // cut, and the spot goes into a rule for the two screen layers only
    // (written on <html>, every move restyled the whole page)
    if (!key) { root.classList.remove('has-hole'); holeVars.forEach((v) => holeRule.style.removeProperty(v)); return; }
    const cut = () => {
      key.split(',').forEach((n, i) => holeRule.style.setProperty(holeVars[i], `${n}px`));
      root.classList.add('has-hole');
    };
    // while the trailer moves (the banner sliding up into place, a glide, a
    // drag) the hole steps aside and comes back once it's still: redrawing a
    // full-screen mask at a new spot every frame was what made scrolling with
    // a trailer stutter
    if (!moving) return cut();
    root.classList.remove('has-hole');
    holeSettle = setTimeout(() => { if (lastHole === key) cut(); }, 160);
  }
  const queueHole = () => { if (!holeFrame) holeFrame = requestAnimationFrame(placeHole); };
  // safety net: if the trailer ever ends up somewhere without the effect
  // being told (an animation the phone cut short), it catches up within a
  // second. Cheap: nothing changes on the page unless the trailer moved.
  setInterval(() => { if (hero && hero.classList.contains('has-video') && !document.hidden) placeHole(); }, 800);
  addEventListener('scroll', queueHole, { passive: true });
  addEventListener('resize', queueHole);
  function setupMini() {
    const screen = hero.querySelector('.fav-hero-screen');
    let past = false;
    // shown whenever the banner is scrolled away (its still shows until the
    // trailer starts), so the pick and its trailer stay with you
    // phones: opening a title's details brings its trailer along, docked
    // just above the details panel (the same player moves, so it keeps
    // playing), and it goes back when the panel closes
    let docked = false;
    // where the docked trailer goes: right above the details panel, which
    // is a bottom sheet on phones and a centred card on bigger screens
    const dockTop = () => {
      const panel = document.querySelector('.fav-sheet-panel');
      if (!panel) return false;
      const safeTop = 12 + (parseFloat(getComputedStyle(hero).getPropertyValue('--sat')) || 0);
      let w, h, top;
      if (innerWidth < 768) {
        w = innerWidth - 24;
        h = w * 9 / 16;
        // the panel gives up room (and scrolls) if the trailer wouldn't fit
        panel.style.maxHeight = `${Math.round(innerHeight - h - safeTop - 12)}px`;
        top = Math.max(safeTop, innerHeight - panel.offsetHeight - h - 12);
      } else if (innerWidth >= 900) {
        // computers: a theater card. The trailer is the card's own screen,
        // full width across its top, with the details underneath; the card
        // widens for it and the pair stays centred
        panel.classList.add('is-theater');
        hero.classList.add('in-theater');
        panel.style.width = '';
        panel.style.setProperty('--theater-h', '0px');
        // the card's details alone, then the biggest screen that still lets
        // the whole card fit in the window (smaller laptops get a smaller one)
        // sized by the window only, never by the summary: every card has the
        // same wide layout, and a long summary scrolls inside the card (it
        // used to shrink the whole card into a narrow one)
        const full = panel.offsetWidth, room = Math.min(innerHeight * .94, innerHeight - safeTop * 2);
        const sumEl = panel.querySelector('.fav-sheet-sum');
        const info = panel.scrollHeight - (sumEl ? sumEl.offsetHeight : 0);
        h = Math.min(full * 9 / 16, room - info - 70); // keeps a few lines of the summary in view
        w = Math.min(full, Math.max(h, 240) * 16 / 9);
        panel.style.width = w < full ? `${Math.round(w)}px` : '';
        h = w * 9 / 16;
        // whatever height is left is the summary's; a longer one scrolls in place
        panel.style.setProperty('--sum-max', `${Math.max(70, Math.round(room - h - info - 8))}px`);
        panel.style.setProperty('--theater-h', `${Math.round(h)}px`);
        const ph = panel.offsetHeight;
        top = Math.max(safeTop, (innerHeight - ph) / 2);
        panel.style.top = `${Math.round(top + ph / 2)}px`;
      } else {
        // the card and the trailer are centred together: the card moves down
        // to make room, and the trailer shrinks only if the screen is short
        const ph = panel.offsetHeight;
        h = Math.min(panel.offsetWidth * 9 / 16, innerHeight - ph - safeTop - 36);
        if (h < 110) return false; // no room above the card
        w = h * 16 / 9;
        top = Math.max(safeTop, (innerHeight - (h + 12 + ph)) / 2);
        panel.style.top = `${Math.round(top + h + 12 + ph / 2)}px`;
      }
      hero.style.setProperty('--dock-top', `${Math.round(top)}px`);
      // the theater card is centred in the details layer (the page's width
      // without the scrollbar): the screen lines up with it exactly
      const box = panel.classList.contains('is-theater') ? panel.parentElement.getBoundingClientRect() : { left: 0, width: innerWidth };
      hero.style.setProperty('--dock-left', `${Math.round(box.left + (box.width - w) / 2)}px`);
      hero.style.setProperty('--dock-w', `${Math.round(w)}px`);
      queueHole();
      return true;
    };
    let panelWatch = null;
    hero.dock = (item) => {
      if (item !== current || !hero.querySelector('.fav-hero-video') || hero.classList.contains('no-trailer')) return;
      // the picture glides from where it is (mini player or banner) down to
      // its spot above the details, growing as it goes
      const tv = hero.querySelector('.fav-hero-tv');
      const first = hero.querySelector('.fav-hero-video').getBoundingClientRect();
      const glide = !reduceMotion.matches && first.width > 0 && first.bottom > 0 && first.top < innerHeight;
      if (!dockTop()) return;
      tv.style.animation = glide ? 'none' : '';
      docked = true;
      miniClosed = false;
      hero.classList.add('is-docked');
      paint();
      if (glide) {
        const last = tv.getBoundingClientRect();
        const k = first.width / last.width;
        tv.animate([
          { transformOrigin: '0 0', transform: `translate(${first.left - last.left}px, ${first.top - last.top}px) scale(${k})` },
          { transformOrigin: '0 0', transform: 'none' },
        ], { duration: 480, easing: 'cubic-bezier(.22, 1, .36, 1)' }).finished.then(queueHole, () => {});
      }
      // only if it isn't already playing: telling a playing trailer to play
      // makes YouTube show its title, pause button and logo again
      const vf = hero.querySelector('.fav-hero-video iframe');
      if (!vf || !vf.playing) ytCommand('playVideo');
      if (!panelWatch && 'ResizeObserver' in window) {
        panelWatch = new ResizeObserver(() => docked && dockTop());
        panelWatch.observe(document.querySelector('.fav-sheet-panel'));
      }
      setTimeout(dockTop, 420); // once the panel has slid up
    };
    hero.undock = () => {
      if (!docked) return;
      docked = false;
      // closing: the picture glides back up into the mini player (or the
      // banner), shrinking as it goes
      const tv = hero.querySelector('.fav-hero-tv');
      const vid = hero.querySelector('.fav-hero-video');
      const first = tv.getBoundingClientRect();
      // no slide-in for the mini player: the picture flies into it. (Turning
      // the slide-in back on here made it replay, a small jump after closing;
      // it comes back once the mini player has gone away.)
      tv.style.animation = 'none';
      hero.classList.remove('is-docked');
      const panel = document.querySelector('.fav-sheet-panel');
      if (panel) { panel.style.maxHeight = panel.style.top = panel.style.width = ''; panel.classList.remove('is-theater'); panel.style.removeProperty('--theater-h'); panel.style.removeProperty('--sum-max'); }
      hero.classList.remove('in-theater');
      paint();
      if (hero.skipGlide) { hero.skipGlide = false; queueHole(); return; } // a swipe already brought it here
      const last = vid.getBoundingClientRect();
      if (!reduceMotion.matches && last.width > 0 && last.bottom > 0 && last.top < innerHeight) {
        vid.animate([
          { transformOrigin: '0 0', transform: `translate(${first.left - last.left}px, ${first.top - last.top}px) scale(${first.width / last.width})`, zIndex: 5 },
          { transformOrigin: '0 0', transform: 'none', zIndex: 5 },
        ], { duration: 420, easing: 'cubic-bezier(.22, 1, .36, 1)' }).finished.then(queueHole, () => {});
      }
    };
    // where a closing trailer goes back to: the mini player (its saved spot,
    // or the bottom right corner) once the banner is scrolled away, else the
    // banner's frame
    hero.closeTarget = () => {
      if (past && !wide.matches) {
        const w = Math.min(innerWidth * .52, 220), h = w * 9 / 16 + 2;
        if (hero.classList.contains('is-placed')) {
          return { x: parseFloat(hero.style.getPropertyValue('--mini-x')) || 0, y: parseFloat(hero.style.getPropertyValue('--mini-y')) || 0, w: w, h };
        }
        const sab = parseFloat(getComputedStyle(hero).getPropertyValue('--sab')) || 0;
        return { x: innerWidth - 12 - w, y: innerHeight - sab - 76 - h, w, h };
      }
      const r = screen.getBoundingClientRect();
      return { x: r.left, y: r.top, w: r.width, h: r.height };
    };
    addEventListener('resize', () => docked && dockTop());
    // drag the mini player anywhere on the screen; it stays where you drop
    // it (remembered on this device). Dragged mostly off the screen, it
    // closes, like flicking it away.
    const tvEl = hero.querySelector('.fav-hero-tv');
    const POS_KEY = 'nedcode-fav-mini-pos';
    const bounds = (w, h) => {
      const top = 8 + (parseFloat(getComputedStyle(hero).getPropertyValue('--sat')) || 0);
      return { minX: 8, maxX: innerWidth - w - 8, minY: top, maxY: innerHeight - h - 76 };
    };
    const place = (x, y) => {
      const r = tvEl.getBoundingClientRect();
      const bd = bounds(r.width, r.height);
      x = Math.min(bd.maxX, Math.max(bd.minX, x));
      y = Math.min(bd.maxY, Math.max(bd.minY, y));
      hero.style.setProperty('--mini-x', `${Math.round(x)}px`);
      hero.style.setProperty('--mini-y', `${Math.round(y)}px`);
      hero.classList.add('is-placed');
      return [x, y];
    };
    try {
      const saved = JSON.parse(localStorage.getItem(POS_KEY));
      if (saved && innerWidth > 0) {
        hero.style.setProperty('--mini-x', `${Math.round(saved.fx * innerWidth)}px`);
        hero.style.setProperty('--mini-y', `${Math.round(saved.fy * innerHeight)}px`);
        hero.classList.add('is-placed');
      }
    } catch (e) {}
    // Like YouTube's and the iPhone's picture-in-picture: it sticks to your
    // finger (one update per screen frame), and when you let go it keeps the
    // momentum of your flick and glides into the nearest corner. Flung hard
    // off the screen, it closes.
    let sx = null, sy = 0, dx = 0, dy = 0, swiped = false, startRect = null;
    let vx = 0, vy = 0, lastX = 0, lastY = 0, lastT = 0, dragFrame = 0, settle = null;
    const outBy = (x, y) => Math.max(
      Math.max(0, -x, x + startRect.width - innerWidth) / startRect.width,
      Math.max(0, -y, y + startRect.height - innerHeight) / startRect.height);
    tvEl.addEventListener('touchstart', (e) => {
      if (!hero.classList.contains('is-mini')) return;
      if (settle) { settle.commitStyles && settle.commitStyles(); settle.cancel(); settle = null; }
      sx = lastX = e.touches[0].clientX; sy = lastY = e.touches[0].clientY;
      dx = dy = vx = vy = 0; swiped = false; lastT = performance.now();
      startRect = tvEl.getBoundingClientRect();
      tvEl.style.transform = '';
      tvEl.style.transition = 'none';
    }, { passive: true });
    tvEl.addEventListener('touchmove', (e) => {
      if (sx === null) return;
      const cx = e.touches[0].clientX, cy = e.touches[0].clientY, now = performance.now();
      const dt = Math.max(1, now - lastT);
      vx = .6 * vx + .4 * ((cx - lastX) / dt); // px per ms, smoothed
      vy = .6 * vy + .4 * ((cy - lastY) / dt);
      lastX = cx; lastY = cy; lastT = now;
      dx = cx - sx; dy = cy - sy;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) swiped = true;
      if (e.cancelable) e.preventDefault(); // the page doesn't scroll while you drag it
      if (!dragFrame) dragFrame = requestAnimationFrame(() => {
        dragFrame = 0;
        if (sx === null) return;
        tvEl.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        tvEl.style.opacity = String(Math.max(.35, 1 - outBy(startRect.left + dx, startRect.top + dy) * 1.1));
        placeHole(); // the lighter screen effect over the trailer moves with it
      });
    }, { passive: false });
    const finish = () => {
      if (sx === null) return;
      sx = null;
      cancelAnimationFrame(dragFrame); dragFrame = 0;
      if (!swiped) { tvEl.style.transform = tvEl.style.opacity = tvEl.style.transition = ''; return; }
      // a stale velocity (finger held still before letting go) doesn't count
      if (performance.now() - lastT > 80) vx = vy = 0;
      const x = startRect.left + dx, y = startRect.top + dy;
      // where the flick would carry it
      const px = x + vx * 180, py = y + vy * 180;
      // closes only when it's already partly off the screen and still heading
      // out, or thrown hard straight out; a quick move across the screen
      // just lands in a corner
      const outNow = outBy(x, y);
      const throwSpeed = Math.hypot(vx, vy);
      if ((outNow > .3 && outBy(px, py) > outNow) || (throwSpeed > 2.4 && outBy(px, py) > 1.2)) {
        // flung off the screen: it flies out and closes
        const fly = tvEl.animate([
          { transform: `translate3d(${dx}px, ${dy}px, 0)`, opacity: tvEl.style.opacity || 1 },
          { transform: `translate3d(${dx + vx * 260}px, ${dy + vy * 260}px, 0)`, opacity: 0 },
        ], { duration: 260, easing: 'cubic-bezier(.2, .7, .4, 1)', fill: 'forwards' });
        fly.finished.then(() => {
          miniClosed = true;
          ytCommand('pauseVideo');
          paint();
          fly.cancel();
          tvEl.style.transition = tvEl.style.transform = tvEl.style.opacity = '';
        }, () => {});
        return;
      }
      // the nearest corner to where the flick was heading
      const bd = bounds(startRect.width, startRect.height);
      const tx = px + startRect.width / 2 < innerWidth / 2 ? bd.minX : bd.maxX;
      const ty = py + startRect.height / 2 < innerHeight / 2 ? bd.minY : bd.maxY;
      const [nx, ny] = place(tx, ty);
      // it now sits in the corner; animate from where your finger left it
      tvEl.style.transform = tvEl.style.opacity = tvEl.style.transition = '';
      const speed = Math.hypot(vx, vy);
      settle = tvEl.animate([
        { transform: `translate3d(${x - nx}px, ${y - ny}px, 0)` },
        { transform: 'translate3d(0, 0, 0)' },
      ], { duration: Math.round(Math.max(260, Math.min(460, 420 - speed * 90))), easing: 'cubic-bezier(.18, .9, .3, 1.04)' });
      // the lighter screen effect over the trailer follows it as it glides
      const track = () => { placeHole(); if (settle) requestAnimationFrame(track); };
      requestAnimationFrame(track);
      settle.finished.then(() => { settle = null; placeHole(); }, () => {});
      try { localStorage.setItem(POS_KEY, JSON.stringify({ fx: nx / innerWidth, fy: ny / innerHeight })); } catch (e) {}
    };
    tvEl.addEventListener('touchend', finish);
    tvEl.addEventListener('touchcancel', finish);
    // keep it on screen when the phone turns
    addEventListener('resize', () => {
      if (!hero.classList.contains('is-placed') || !hero.classList.contains('is-mini')) return;
      const r = tvEl.getBoundingClientRect();
      place(r.left, r.top);
    });
    // a drag isn't a tap: don't open the details after one
    tvEl.addEventListener('click', (e) => { if (swiped) { swiped = false; e.stopPropagation(); e.preventDefault(); } }, true);
    const paint = () => {
      const was = hero.classList.contains('is-mini');
      hero.classList.toggle('is-mini', past && !wide.matches && !miniClosed && !docked && !hero.classList.contains('no-trailer'));
      if (was && !hero.classList.contains('is-mini') && !docked) hero.querySelector('.fav-hero-tv').style.animation = '';
      queueHole();
      setTimeout(queueHole, 350); // after the mini player has slid in
    };
    hero.paintMini = paint;
    // the mini player takes over as soon as most of the banner's video has
    // scrolled away (under half of it left on screen), not only once it's
    // completely gone
    new IntersectionObserver(([e]) => {
      past = e.boundingClientRect.top < 0 && e.intersectionRatio < .5;
      if (!past && miniClosed) { miniClosed = false; ytCommand('playVideo'); } // back at the banner: play again
      paint();
    }, { threshold: [0, .25, .5, .75, 1] }).observe(screen);
    // tap the title: the pick's details
    hero.querySelector('.fav-hero-mini-info').addEventListener('click', () => current && openSheet(current));
    hero.querySelector('.fav-hero-mini-x').addEventListener('click', () => {
      miniClosed = true;
      ytCommand('pauseVideo');
      paint();
    });
    wide.addEventListener('change', paint);
  }
  const heroInView = () => {
    const r = hero.getBoundingClientRect();
    return r.top > -r.height / 2 && r.bottom < innerHeight + r.height / 2;
  };
  // desktop: the pick's trailer plays muted on a loop on the right of the
  // banner, over its still (YouTube's no-cookie player; it can't be clicked)
  const wide = matchMedia('(min-width: 900px)');
  addEventListener('message', (e) => {
    if (!hero || !/^https:\/\/www\.youtube(-nocookie)?\.com$/.test(e.origin)) return;
    const fr = hero.querySelector('.fav-hero-video iframe');
    if (!fr || e.source !== fr.contentWindow) return;
    let d; try { d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch (err) { return; }
    const state = d && (d.event === 'onStateChange' ? d.info : d.info && d.info.playerState);
    if (typeof state !== 'number') return;
    // our own loop (YouTube's loop adds previous/next buttons). Starting over
    // brings YouTube's title, pause button and logo back for a few seconds,
    // so the still shows again until they've faded, like the first start
    if (state === 0) {
      clearTimeout(hero.videoHide);
      hero.classList.remove('has-video');
      ytCommand('seekTo', [TRAILER_START, true]);
      ytCommand('playVideo');
    }
    if (state === 1) {
      fr.playing = true;
      hero.classList.remove('needs-tap');
      // YouTube puts its own title, channel logo, pause button and "Watch on
      // YouTube" over the first ~3 s of play, and they can't be turned off:
      // the still stays up until they've faded, then the trailer shows
      clearTimeout(hero.videoHide);
      hero.videoHide = setTimeout(() => { hero.classList.add('has-video'); hero.classList.remove('is-tuning'); if (hero.paintMini) hero.paintMini(); }, 3200);
      if (soundOn && !fr.soundSet) { fr.soundSet = true; fr.unmutedAt = Date.now(); applySound(); }
    }
    // iPhones pause a video that turns its sound on without a tap on it, so
    // with sound on, each new trailer stopped (and only played after a second
    // tap). If that happens: back to muted and keep playing; the speaker
    // button shows muted, and one tap on it brings the sound
    else if (state === 2 && fr.unmutedAt && Date.now() - fr.unmutedAt < 2500) {
      fr.unmutedAt = 0;
      soundOn = false;
      paintSound();
      ytCommand('mute');
      ytCommand('playVideo');
    }
    else if (!miniClosed) { clearTimeout(hero.videoHide); hero.classList.remove('has-video'); if (hero.paintMini) hero.paintMini(); }
  });
  // the one control: sound on or off (the trailer starts muted). The choice
  // carries over when you pick another title.
  // the sound choice is remembered on this device for next time
  const SOUND_KEY = 'nedcode-fav-sound';
  let soundOn = false;
  try { soundOn = localStorage.getItem(SOUND_KEY) === '1'; } catch (e) {}
  const ytCommand = (func, args = []) => {
    const fr = hero && hero.querySelector('.fav-hero-video iframe');
    if (fr) try { fr.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args }), '*'); } catch (e) {}
  };
  const paintSound = () => {
    const b = hero && hero.querySelector('.fav-hero-sound');
    if (!b) return;
    b.setAttribute('aria-pressed', String(soundOn));
    b.setAttribute('aria-label', soundOn ? 'Mute trailer' : 'Turn trailer sound on');
  };
  const applySound = () => {
    if (soundOn) { ytCommand('unMute'); ytCommand('setVolume', [70]); } else ytCommand('mute');
  };
  // trailers start a little way in, past the studio logos and titles
  const TRAILER_START = 20;
  function playTrailer(f, id) {
    const slot = hero.querySelector('.fav-hero-video');
    slot.replaceChildren();
    if (reduceMotion.matches || f.type === 'book') return; // books have no trailer
    // the moment you pick: the frame flickers into static, like a TV changing
    // channel, while YouTube loads and its own title and buttons fade; the
    // trailer then cuts in clean (css: "tuning")
    hero.classList.add('is-tuning');
    clearTimeout(hero.tuneEnd);
    hero.tuneEnd = setTimeout(() => hero.classList.remove('is-tuning'), 9000); // never plays: back to the still // every screen size: wide banners on the right, phones in the frame on top
    trailerFor(f).then((v) => {
      if (id !== paintId) return;
      if (!v) { hero.classList.remove('is-tuning'); return; }
      const fr = document.createElement('iframe');
      fr.src = `https://www.youtube-nocookie.com/embed/${v}?start=${TRAILER_START}&autoplay=1&mute=1&controls=0&playsinline=1&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&fs=0&cc_load_policy=0&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`;
      fr.title = `${f.title} trailer`;
      fr.allow = 'autoplay; encrypted-media';
      fr.tabIndex = -1;
      // the player tells us its state: the video only shows while it's
      // actually playing, so YouTube's play button, loading spinner, pause
      // and end screens never appear (the still shows instead)
      // phones don't always start a muted trailer by themselves when it's
      // small or picked further down the page (it only started once the
      // details opened), so it's told to play until it reports playing
      fr.onload = () => {
        try { fr.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 1 }), '*'); } catch (e) {}
        let tries = 0;
        const kick = setInterval(() => {
          if (fr.playing || !fr.isConnected || ++tries > 10) return clearInterval(kick);
          try { fr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*'); } catch (e) {}
        }, 700);
      };
      slot.append(fr);
      clearTimeout(hero.tapTimer);
      hero.tapTimer = setTimeout(() => {
        if (fr.playing || !fr.isConnected) return;
        hero.classList.remove('is-tuning');
        hero.classList.add('needs-tap');
      }, 6000);
    }).catch(() => {});
  }
  function select(item, kicker) {
    if (!hero) return;
    if (current) { current.el.classList.remove('is-selected'); current.el.setAttribute('aria-pressed', 'false'); }
    current = item;
    item.el.classList.add('is-selected');
    item.el.setAttribute('aria-pressed', 'true');
    const f = item.fav;
    const id = ++paintId; // a slow cover for an earlier pick never lands on this one
    hero.querySelector('.fav-hero-kicker').textContent = `P1 · ${kicker || TYPE_NAME[f.type]}`;
    hero.querySelector('.fav-hero-title').textContent = f.title;
    hero.querySelector('.fav-hero-meta').textContent = [f.year, f.genre].filter(Boolean).join(' · ');
    // a tiny serial line, like the fine print on a jet or a flight suit
    const serial = hero.querySelector('.lv-micro') || hero.querySelector('.fav-hero-info').appendChild(Object.assign(document.createElement('span'), { className: 'lv-micro' }));
    serial.setAttribute('aria-hidden', 'true');
    const by = (f.by || '').split(/\s+/);
    const who = by.length > 1 ? by.slice(0, -1).map((w) => w[0] + '.').join('') + ' ' + by[by.length - 1] : f.by || '';
    serial.textContent = [`FAV-${String(cards.indexOf(item) + 1).padStart(3, '0')}`, who && `${f.type === 'book' ? 'BY' : 'DIR'} ${who}`, f.year].filter(Boolean).join(' · ').toUpperCase();
    hero.querySelector('.fav-hero-rate').innerHTML = `${starsHTML(item.rating)}<b>${item.rating}</b><span>${escapeHTML(verdict(item.rating))}</span>`;
    hero.querySelector('.fav-hero-mini-title').textContent = f.title;
    hero.querySelector('.fav-hero-mini-rate').innerHTML = `<b>${item.rating}</b> ${escapeHTML(verdict(item.rating))} · details`;
    miniClosed = false; // picking something new brings the player back
    hero.classList.remove('is-mini-swap'); void hero.offsetWidth; hero.classList.add('is-mini-swap');
    hero.querySelector('.fav-hero-sum').textContent = '';
    // switching from a title that was playing: a bright burst of static
    // first, like flicking the channel, then the new one tunes in
    if (hero.classList.contains('has-video')) {
      hero.classList.remove('is-switching'); void hero.offsetWidth; hero.classList.add('is-switching');
      clearTimeout(hero.switchEnd);
      hero.switchEnd = setTimeout(() => hero.classList.remove('is-switching'), 450);
    }
    hero.classList.remove('has-cover', 'has-backdrop', 'has-video', 'needs-tap');
    if (hero.paintMini) hero.paintMini();
    playTrailer(f, id);
    // the last title's still stays up until the new one has loaded, so the
    // trailer frame never goes blank while switching. A book has no trailer:
    // no video frame, no mini player, just its details.
    const isBook = f.type === 'book';
    hero.classList.toggle('no-trailer', isBook);
    if (isBook) { hero.style.removeProperty('--backdrop'); hero.classList.remove('is-tuning', 'is-switching'); }
    if (hero.paintMini) hero.paintMini();
    // a quick flash, like the portrait swapping in
    hero.classList.remove('is-swap');
    void hero.offsetWidth;
    hero.classList.add('is-swap');
    // desktop: the title's own wide still drifts slowly behind the banner,
    // with its summary beside the poster
    infoFor(f).then((info) => {
      if (id !== paintId) return;
      hero.querySelector('.fav-hero-sum').textContent = info.summary || '';
      if (!info.backdrop) return;
      const still = new Image();
      still.onload = () => {
        if (id !== paintId) return;
        hero.style.setProperty('--backdrop', `url("${info.backdrop}")`);
        hero.classList.add('has-backdrop');
      };
      still.src = info.backdrop;
    }).catch(() => {});
    const img = hero.querySelector('img');
    img.removeAttribute('srcset');
    img.removeAttribute('src');
    coverFor(f).then((url) => {
      if (!url || id !== paintId) return;
      img.onload = () => { if (id === paintId) hero.classList.add('has-cover'); };
      const set = coverSrcset(url);
      if (set) { img.sizes = '(min-width: 768px) 160px, 30vw'; img.srcset = set; }
      img.src = url;
      hero.style.setProperty('--hero', `url("${url}")`);
    }).catch(() => {});
  }

  /*---------- filters ----------*/
  let filter = 'all';
  const typeSelect = document.getElementById('favType');
  const refilter = () => {
    cards.forEach((c) => setFlipped(c.el, false));
    layoutShelves();
  };
  if (typeSelect) {
    typeSelect.value = 'all';
    typeSelect.addEventListener('change', () => { filter = typeSelect.value; refilter(); });
    genreSelect.addEventListener('change', () => { genre = genreSelect.value; refilter(); });
  }

  /*---------- pick for me ----------*/
  let picking = false;
  const pickButton = document.getElementById('favPick');

  // the part of the screen the posters can really be seen in: below the
  // sticky menus and, on computers, below the pinned banner and its fade
  function clearTop() {
    let top = 0;
    const bar = document.querySelector('.fav-bar');
    if (bar) top = Math.max(top, bar.getBoundingClientRect().bottom);
    if (hero && getComputedStyle(hero).position === 'sticky') top = Math.max(top, hero.getBoundingClientRect().bottom + 40);
    return top;
  }
  function onScreen(el) {
    const r = el.getBoundingClientRect();
    const row = el.parentElement.getBoundingClientRect();
    return r.top >= clearTop() && r.bottom <= window.innerHeight && r.width > 0 &&
      r.right > row.left && r.left < row.right;
  }

  function land(card) {
    const r = card.getBoundingClientRect();
    const row = card.parentElement.getBoundingClientRect();
    const top = clearTop();
    const visible = r.top >= top && r.bottom <= window.innerHeight &&
      r.left >= row.left && r.right <= row.right;
    // not fully in sight (under the banner, or off screen): scroll so it sits
    // in the middle of the space left under the menus and the banner
    if (!visible) {
      const room = window.innerHeight - top;
      const to = scrollY + r.top - top - Math.max(0, (room - r.height) / 2);
      window.scrollTo({ top: Math.max(0, to), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      if (r.left < row.left || r.right > row.right) card.parentElement.scrollBy({ left: r.left - row.left - (row.width - r.width) / 2, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }
    setTimeout(
      () => {
        card.classList.add('is-picked');
        setTimeout(() => card.classList.remove('is-picked'), 1600);
        // the reveal: every other poster dims for a moment, a spotlight on the pick
        grid.classList.add('is-revealing');
        clearTimeout(grid.revealEnd);
        grid.revealEnd = setTimeout(() => grid.classList.remove('is-revealing'), 1300);
        picking = false;
        pickButton.classList.remove('is-shuffling', 'is-picking');
        // then it's the pick, like tapping it
        const item = cards.find((c) => c.el === card);
        if (hero) select(item);
        if (!hero || !heroInView()) setTimeout(() => openSheet(item), 500);
      },
      visible || reduceMotion.matches ? 0 : 450,
    );
  }

  /*---------- search ----------*/
  // the magnifier opens a field over the menus; type a few letters and the
  // matching titles show under it. Picking one clears the filters if they
  // hide it, then jumps to it like the shuffle does.
  const findButton = document.getElementById('favFind');
  if (findButton) {
    const bar = findButton.closest('.fav-bar');
    const box = document.createElement('div');
    box.className = 'fav-search';
    box.hidden = true;
    box.innerHTML = `<input type="search" placeholder="Search movies, shows, books" aria-label="Search favorites" autocomplete="off" enterkeyhint="go"><button type="button" class="fav-search-x" aria-label="Close search"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg></button><ul class="fav-search-list" role="listbox"></ul>`;
    bar.append(box);
    const input = box.querySelector('input');
    const list = box.querySelector('.fav-search-list');
    const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
    const close = () => { box.hidden = true; bar.classList.remove('is-searching'); findButton.setAttribute('aria-expanded', 'false'); input.value = ''; list.replaceChildren(); };
    const open = () => { box.hidden = false; bar.classList.add('is-searching'); findButton.setAttribute('aria-expanded', 'true'); input.focus(); };
    const go = (item) => {
      close();
      if (!item.shelf) { // hidden by the filters: show everything again
        filter = 'all'; genre = 'any';
        if (typeSelect) typeSelect.value = 'all';
        refilter();
      }
      requestAnimationFrame(() => land(item.el));
    };
    findButton.addEventListener('click', () => (box.hidden ? open() : close()));
    box.querySelector('.fav-search-x').addEventListener('click', close);
    // keyboard: up and down move through the results, Enter opens the
    // highlighted one (or the first), Escape closes. "/" or Ctrl/Cmd+K opens
    // the search from anywhere on the page.
    let active = -1;
    const hl = (i) => {
      const items = [...list.querySelectorAll('button')];
      if (!items.length) { active = -1; return; }
      active = (i + items.length) % items.length;
      items.forEach((b, k) => b.setAttribute('aria-selected', String(k === active)));
      items[active].scrollIntoView({ block: 'nearest' });
      input.setAttribute('aria-activedescendant', items[active].id);
    };
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-controls', 'favSearchList');
    input.setAttribute('aria-expanded', 'false');
    list.id = 'favSearchList';
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); findButton.focus(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); hl(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); hl(active - 1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        const items = [...list.querySelectorAll('button')];
        const pick = items[active >= 0 ? active : 0];
        if (pick) pick.click();
      }
    });
    addEventListener('keydown', (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName) || (document.activeElement && document.activeElement.isContentEditable);
      if (((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) && box.hidden) { e.preventDefault(); open(); }
    });
    input.addEventListener('input', () => {
      const q = norm(input.value);
      list.replaceChildren();
      active = -1;
      input.removeAttribute('aria-activedescendant');
      input.setAttribute('aria-expanded', String(!!q));
      if (!q) return;
      const hits = cards.filter((c) => norm(`${c.fav.title} ${c.fav.by || ''}`).includes(q))
        .sort((a, b) => norm(a.fav.title).indexOf(q) - norm(b.fav.title).indexOf(q) || b.rating - a.rating)
        .slice(0, 6);
      if (!hits.length) { list.innerHTML = '<li class="fav-search-none" role="status">No results</li>'; return; }
      hits.forEach((c, k) => {
        const li = document.createElement('li');
        li.innerHTML = `<button type="button" role="option" id="favOpt${k}" aria-selected="false" tabindex="-1"><b></b><span></span></button>`;
        li.querySelector('b').textContent = c.fav.title;
        li.querySelector('span').textContent = [TYPE_NAME[c.fav.type], c.fav.year, `${c.rating}\u2605`].filter(Boolean).join(' \u00b7 ');
        li.querySelector('button').addEventListener('click', () => go(c));
        li.querySelector('button').addEventListener('mousemove', () => { if (active !== k) hl(k); });
        list.append(li);
      });
      hl(0); // the first result is ready for Enter
    });
  }

  if (pickButton) {
    // feels pressed the moment your finger touches it (phones don't show a
    // press on their own)
    const press = (on) => pickButton.classList.toggle('is-pressed', on);
    pickButton.addEventListener('pointerdown', () => press(true));
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => pickButton.addEventListener(ev, () => setTimeout(() => press(false), 90)));
    pickButton.addEventListener('click', () => {
      if (picking) return;
      const pool = cards.filter((c) => c.shelf).map((c) => c.el);
      if (!pool.length) return;
      picking = true;
      pickButton.classList.add('is-shuffling'); // the arrows keep shuffling until it lands
      setTimeout(() => pickButton.classList.remove('is-shuffling'), 4000); // in case it never lands
      pool.forEach((c) => setFlipped(c, false));
      const target = pool[Math.floor(Math.random() * pool.length)];
      if (reduceMotion.matches) return land(target);

      // hop across the covers you can see, slowing down, then land on the pick
      const seen = pool.filter(onScreen);
      const hopPool = seen.length >= 3 ? seen : pool;
      let n = 0;
      let last = null;
      const steps = 14;
      const hop = () => {
        if (last) last.classList.remove('is-hopping');
        if (n >= steps) return land(target);
        let next = hopPool[Math.floor(Math.random() * hopPool.length)];
        if (next === last && hopPool.length > 1)
          next = hopPool[(hopPool.indexOf(next) + 1) % hopPool.length];
        next.classList.add('is-hopping');
        last = next;
        n++;
        setTimeout(hop, 60 + n * 14);
      };
      hop();
    });
  }

  /*---------- covers (automatic) ----------*/
  let cache = {};
  try {
    cache = JSON.parse(localStorage.getItem(COVER_CACHE_KEY)) || {};
  } catch (e) {
    cache = {};
  }
  function saveCache() {
    try {
      localStorage.setItem(COVER_CACHE_KEY, JSON.stringify(cache));
    } catch (e) {}
  }
  const cacheId = (f) =>
    [f.type, f.title, f.year || '', f.by || '', f.tmdbId || ''].join('|');

  async function getJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  async function findBookCover(f) {
    const q =
      `title=${encodeURIComponent(f.title)}` +
      (f.by ? `&author=${encodeURIComponent(f.by)}` : '');
    const data = await getJSON(
      `https://openlibrary.org/search.json?${q}&limit=5&fields=cover_i`,
    );
    const hit = (data.docs || []).find(
      (d) => Number.isInteger(d.cover_i) && d.cover_i > 0,
    ); // only real cover numbers
    return hit
      ? `https://covers.openlibrary.org/b/id/${hit.cover_i}-M.jpg`
      : '';
  }

  async function findScreenCover(f) {
    // Covers come from our own Netlify Function proxy, which holds the TMDB
    // key server-side (see netlify/functions/tmdb.js). If the proxy is down
    // or unconfigured, getJSON throws and the caller keeps the placeholder.
    const kind = f.type === 'tv' ? 'tv' : 'movie';
    const base = '/.netlify/functions/tmdb';
    let poster = '';
    if (f.tmdbId) {
      const data = await getJSON(
        `${base}?kind=${kind}&id=${encodeURIComponent(f.tmdbId)}`,
      );
      poster = data.poster_path || '';
    } else {
      const query = `q=${encodeURIComponent(f.title)}`;
      const yearParam = f.year ? `&year=${f.year}` : '';
      let data = await getJSON(`${base}?kind=${kind}&${query}${yearParam}`);
      let hit = (data.results || []).find((r) => r.poster_path);
      if (!hit && f.year) {
        // release dates differ between countries, so try once more without the year
        data = await getJSON(`${base}?kind=${kind}&${query}`);
        hit = (data.results || []).find((r) => r.poster_path);
      }
      poster = hit ? hit.poster_path : '';
    }
    const safe =
      typeof poster === 'string' && /^\/[A-Za-z0-9._-]+$/.test(poster); // only plain image file names
    return safe ? `https://image.tmdb.org/t/p/w342${poster}` : '';
  }

  // Sharp covers on every screen: the cached link is the medium size, and
  // this lists the other sizes the services offer so each device downloads
  // the one it needs (bigger on high-density screens like iPhones).
  function coverSrcset(url) {
    const tmdb = url.match(/^(https:\/\/image\.tmdb\.org\/t\/p\/)w\d+(\/.+)$/);
    if (tmdb) return [185, 342, 500, 780].map((w) => `${tmdb[1]}w${w}${tmdb[2]} ${w}w`).join(', ');
    const ol = url.match(/^(https:\/\/covers\.openlibrary\.org\/b\/id\/\d+)-M\.jpg$/);
    if (ol) return `${ol[1]}-M.jpg 180w, ${ol[1]}-L.jpg 500w`;
    return '';
  }

  async function coverFor(f) {
    if (f.cover) return f.cover;
    const id = cacheId(f);
    const hit = cache[id];
    if (hit) {
      const maxAge =
        (hit.url ? CACHE_DAYS_FOUND : CACHE_DAYS_MISSING) * 86400000;
      if (Date.now() - hit.t < maxAge) return hit.url;
    }
    const url =
      f.type === 'book' ? await findBookCover(f) : await findScreenCover(f);
    if (url === null) return null;
    cache[id] = { url, t: Date.now() };
    saveCache();
    return url;
  }

  function showCover(item, url) {
    if (!url) return;
    const img = item.el.querySelector('.fav-cover');
    img.onload = () => item.el.classList.add('has-cover'); // fades the cover in
    img.onerror = () => {
      img.removeAttribute('src');
      delete cache[cacheId(item.fav)]; // try again next visit
      saveCache();
    };
    const set = coverSrcset(url);
    if (set) {
      img.sizes = '(min-width: 768px) 220px, 34vw';
      img.srcset = set;
    }
    img.src = url;
  }

  // only a few lookups at a time, and only for cards near the screen
  const queue = [];
  let running = 0;
  const MAX_AT_ONCE = 4;
  function pump() {
    while (running < MAX_AT_ONCE && queue.length) {
      const item = queue.shift();
      running++;
      coverFor(item.fav)
        .then((url) => showCover(item, url))
        .catch(() => {}) // offline or service down: the placeholder stays
        .finally(() => {
          running--;
          pump();
        });
    }
  }
  function requestCover(item) {
    if (item.requested) return;
    item.requested = true;
    queue.push(item);
    pump();
  }

  /*---------- Lab: the receipt printer reads the same list ----------*/
  if (labReceipt) window.nedcodeFavs = { list: FAVORITES, coverFor, coverSrcset, verdict, escapeHTML };
  if (!grid && !homeCard) return;

  /*---------- home page: the movie deck ----------*/
  // The newest movie on the list (they're added at the top) as one 3D card:
  // poster on the front, details, take and rating on the back. The deck
  // code below still handles more cards; slice(0, 1) keeps it to one. Posters use the same lookup and cache as
  // this page, so the home page stays up to date by itself.
  if (!grid) {
    const deck = FAVORITES.filter((f) => f.type === 'movie').slice(0, 1);
    if (!deck.length) return;
    const tk = homeCard.querySelector('.tk3');
    const hold = homeCard.querySelector('.tk3-hold');
    const scene = homeCard.querySelector('.tk3-scene');
    const back = homeCard.querySelector('.tk3-back');
    const img = homeCard.querySelector('.xb-poster img');
    const peeks = [...homeCard.querySelectorAll('.tk3-peek')];
    const dotsBox = homeCard.querySelector('.tk3-dots');
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const covers = deck.map((f) => coverFor(f).catch(() => ''));
    // load every poster in the deck at front-card size up front, so a swap
    // never waits on the network
    covers.forEach((p) => p.then((url) => {
      if (!url) return;
      ['250px', '120px'].forEach((sizes) => {
        const pre = new Image();
        const set = coverSrcset(url);
        if (set) { pre.sizes = sizes; pre.srcset = set; }
        pre.src = url;
      });
    }));
    let at = 0;

    // a poster into an <img>, sharp on every screen; ok() runs once it shows
    const setPoster = (el, url, sizes, ok) => {
      el.onload = ok || null;
      el.removeAttribute('srcset');
      const set = coverSrcset(url);
      if (set) {
        el.sizes = sizes;
        el.srcset = set;
      }
      el.src = url;
    };

    // smooth: used at the end of a shuffle, when every new poster is already
    // loaded; the posters are swapped in place, with no shimmer in between
    const show = (i, smooth = false) => {
      at = i;
      const pick = deck[i];
      const label = homeCard.querySelector('.tk3-label');
      if (label) label.textContent = i === 0 ? 'Just watched' : 'Recently watched';
      back.querySelector('.tk3-bt').textContent = pick.title;
      back.querySelector('.tk3-by').textContent = pick.year || '';
      back.querySelector('.tk3-genre').textContent = pick.genre || '—';
      back.querySelector('.tk3-dir').textContent = pick.by || '—';
      const take = back.querySelector('.tk3-take');
      take.textContent = pick.take ? `“${pick.take}”` : '';
      take.hidden = !pick.take;
      back.querySelector('.tk3-panel').classList.toggle('has-take', !!pick.take);
      const num = back.querySelector('.tk3-num b');
      num.textContent = pick.rating;
      num.dataset.score = pick.rating;
      back.querySelector('.tk3-verdict').textContent = verdict(pick.rating);
      back.querySelector('.tk3-meter').style.setProperty('--p', pick.rating / 5);
      back.querySelector('.tk3-bstars').outerHTML = starsHTML(pick.rating).replace('fav-stars', 'fav-stars xb-stars tk3-bstars');
      homeCard.setAttribute('aria-label', `${i === 0 ? 'Just watched' : 'Recently watched'}: ${pick.title}, rated ${pick.rating} out of 5`);

      // front poster: a soft shimmer until it arrives, popcorn if there's none
      if (!smooth) {
        tk.classList.remove('has-poster', 'no-poster');
        img.removeAttribute('srcset');
        img.removeAttribute('src');
      }
      covers[i].then((url) => {
        if (at !== i) return;
        if (!url) { tk.classList.remove('has-poster'); tk.classList.add('no-poster'); return; }
        tk.classList.remove('no-poster');
        setPoster(img, url, '250px', () => {
          if (at !== i) return;
          // the blurred back of the card uses the same poster
          homeCard.style.setProperty('--poster', `url("${url}")`);
          tk.classList.add('has-poster');
        });
      });

      dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false'));

      // the other movies fan out behind, in order
      peeks.forEach((peek, k) => {
        const j = (i + 1 + k) % deck.length;
        peek.hidden = deck.length < 2 + k;
        peek.dataset.i = j;
        peek.setAttribute('aria-label', `Show ${deck[j].title}`);
        const pimg = peek.querySelector('img');
        if (!smooth) peek.classList.remove('has-poster', 'no-poster');
        covers[j].then((url) => {
          if (peek.dataset.i !== String(j)) return;
          if (!url) { peek.classList.remove('has-poster'); peek.classList.add('no-poster'); return; }
          peek.classList.remove('no-poster');
          setPoster(pimg, url, '120px', () => peek.classList.add('has-poster'));
        });
      });
    };

    // bring another movie to the front like a hand of cards being shuffled:
    // the three cards rotate places in one motion. The tapped card swings up
    // and forward into the front spot, the front card dips back into the slot
    // behind on the other side, and the third card slides across to the slot
    // the tapped one left. Each moves on a soft arc with iOS-style easing.
    // When they land, the content is swapped under them in a single frame and
    // the animations are removed, so nothing jumps.
    const SWAP_MS = 700;
    const EASE = 'cubic-bezier(.45, .05, .25, 1)'; // eases in gently, glides, settles softly
    let swapping = false;
    const slot = (el) => {
      const cs = getComputedStyle(el);
      return { x: parseFloat(cs.getPropertyValue('--x')) || 0, r: parseFloat(cs.getPropertyValue('--r')) || 0 };
    };
    const peekTf = (x, r, extra = '') => `translate(-50%, -50%) translateX(${x}px) rotate(${r}deg) ${extra}`;
    // a poster fully loaded and decoded at the size it's shown at, so swapping
    // it in later shows it in the very same frame
    const decoded = {};
    const decode = (k, sizes) => covers[k].then((url) => {
      if (!url) return;
      const key = `${url} ${sizes}`;
      if (!decoded[key]) {
        const pre = new Image();
        const set = coverSrcset(url);
        if (set) { pre.sizes = sizes; pre.srcset = set; }
        pre.src = url;
        decoded[key] = (pre.decode ? pre.decode() : Promise.resolve()).catch(() => {});
      }
      return decoded[key];
    });
    const wait = (ms) => new Promise((done) => setTimeout(done, ms));
    const deal = (i) => {
      if (i === at || swapping) return;
      const swap = () => {
        show(i);
        tk.dispatchEvent(new CustomEvent('tk3:reset'));
      };
      const peek = peeks.find((p) => p.dataset.i === String(i));
      const other = peeks.find((p) => p !== peek && !p.hidden);
      if (still || !peek || !other || typeof peek.animate !== 'function') { swap(); return; }
      swapping = true;
      scene.classList.add('is-swapping');
      const from = slot(peek), to = slot(other);
      const S = 1 / .92; // a back card is 92% of the front one
      const opts = { duration: SWAP_MS, easing: EASE, fill: 'forwards' };
      // z order while they cross: the rising card on top, the falling one under it
      peek.style.zIndex = 3;
      other.style.zIndex = 0;
      const anims = [
        // tapped card: up and forward to the front
        peek.animate([
          { transform: peekTf(from.x, from.r), filter: 'brightness(.5) saturate(.8)' },
          { transform: peekTf(from.x * .35, from.r * .2, `translateY(-14px) scale(${(1 + S) / 2})`), filter: 'brightness(.85) saturate(.95)', offset: .5 },
          { transform: peekTf(0, 0, `scale(${S})`), filter: 'brightness(1) saturate(1)' },
        ], opts),
        // front card: dips back and away into the far slot
        hold.animate([
          { transform: 'none', filter: 'brightness(1)' },
          { transform: `translateX(${to.x * .55}px) translateY(8px) rotate(${to.r * .6}deg) scale(.9)`, filter: 'brightness(.7)', offset: .5 },
          { transform: `translateX(${to.x}px) rotate(${to.r}deg) scale(.92)`, filter: 'brightness(.5)' },
        ], opts),
        // third card: slides across to the slot the tapped card left
        other.animate([
          { transform: peekTf(to.x, to.r) },
          { transform: peekTf((to.x + from.x) / 2, 0, 'translateY(4px) scale(.97)'), offset: .5 },
          { transform: peekTf(from.x, from.r) },
        ], opts),
      ];
      hold.style.zIndex = 1;
      // meanwhile, get every new poster ready: the front one and both back ones
      const others = [1, 2].map((k) => (i + k) % deck.length).filter((k) => k !== i);
      const posters = Promise.race([
        Promise.all([decode(i, '250px'), ...others.map((k) => decode(k, '120px'))]),
        wait(1500), // never hold the cards up for long on a slow connection
      ]);
      Promise.all([...anims.map((a) => a.finished), posters]).then(() => requestAnimationFrame(() => {
        // every card sits exactly where its new movie goes: swap the movies
        // and drop the animations in this same frame, so nothing flashes
        show(i, true);
        tk.dispatchEvent(new CustomEvent('tk3:reset')); // flat at the hand-over
        scene.classList.add('is-settling');
        anims.forEach((a) => a.cancel());
        [peek, other, hold].forEach((el) => { el.style.zIndex = ''; });
        scene.classList.remove('is-swapping');
        requestAnimationFrame(() => requestAnimationFrame(() => {
          scene.classList.remove('is-settling');
          swapping = false;
        }));
      }));
    };

    peeks.forEach((peek) => peek.addEventListener('click', () => deal(Number(peek.dataset.i))));

    // one dot per movie under the deck: shows which one is in front, tap to jump
    const dots = deck.length > 1 ? deck.map((f, k) => {
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'tk3-dot';
      d.setAttribute('aria-label', `Show ${f.title}`);
      d.addEventListener('click', () => deal(k));
      dotsBox.append(d);
      return d;
    }) : [];
    dotsBox.hidden = !dots.length;
    tk.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      e.preventDefault();
      deal((at + (e.key === 'ArrowDown' ? 1 : deck.length - 1)) % deck.length);
    });

    show(0);
    homeCard.hidden = false;
    // the home ticker shows the latest pick
    window.nedcodePick = { title: deck[0].title, rating: deck[0].rating, year: deck[0].year, verdict: verdict(deck[0].rating) };
    return;
  }

  /*---------- start ----------*/
  renderStats();
  buildCards();
  buildBanner();
  // look each title's trailer up as its poster comes near the screen (one at
  // a time, gently), so a tap finds it ready and the static is short
  if ('IntersectionObserver' in window) {
    const queue = [];
    let busy = false;
    const pump = () => {
      if (busy || !queue.length) return;
      busy = true;
      trailerFor(queue.shift().fav).catch(() => {}).finally(() => setTimeout(() => { busy = false; pump(); }, 250));
    };
    const ahead = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      ahead.unobserve(e.target);
      const item = cards.find((c) => c.el === e.target);
      if (item && item.fav.type !== 'book') { queue.push(item); pump(); }
    }), { rootMargin: '300px 0px' });
    cards.forEach((c) => ahead.observe(c.el));
  }
})();
