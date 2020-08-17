const searchSong = document.getElementById('searchSong');
const searchButton = document.getElementById('searchButton');
const songApi = 'https://api.lyrics.ovh/suggest/';
const lyricApi = 'https://api.lyrics.ovh/v1/';

// search button event handler
searchButton.addEventListener('click', () => { 
    songList.innerHTML = '';
    songLyrics.innerHTML = '';
    getSongList();
});


// api call for search result
const getSongList = () => {
    fetch(`${songApi}${searchSong.value}`)
        .then(res => res.json())
        .then(data =>{
            createSongList(data.data);
        })
}

// Take first 5 result item from the total search result
const createSongList = (totalResult) => {
    for (let i = 0; i<5; i++) {

        document.getElementById('songList').innerHTML +=` <div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-2">
                                <img height="70" width="100" src="${totalResult[i].artist.picture}" class="rounded">
                           </div>
                            <div class="col-md-7 pl-4">
                                <h3 class="lyrics-name m-0 pb-1">${totalResult[i].title} </h3>
                                <p class="author lead small m-0 ">Artist: <span>${totalResult[i].artist.name}</span></p>
                                <p class="author lead small m-0 ">Album: <span>${totalResult[i].album.title}</span></p>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button onclick="getLyric('${totalResult[i].artist.name}', '${totalResult[i].title}')" class="btn btn-success">Get Lyrics</button>
                            </div>
                            </div>`;
    }
}

//  api call when get lyrics button click
const getLyric = (artist,title) => {
    fetch(`${lyricApi}/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            showLyric(title, artist, data.lyrics);
        })
}

// show lyrics for selected item
const showLyric = (title, artist, lyric = 'Lyric not available! Please try another one.') => {
    document.getElementById('songLyrics').innerHTML = ` <button class="btn go-back">&lsaquo;</button>
                                <h2 class="text-success mb-4">${title} - ${artist}</h2>
                                <pre class="lyric text-white">${lyric}</pre>
                             `;
}
