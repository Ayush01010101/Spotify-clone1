let currentMusic = new Audio("Songs\\CUTE DEPRESSED.mp3");

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
      return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs() {
  let songs = await fetch("http://127.0.0.1:3000/songs/");
  let song_data = await songs.text();
  let div = document.createElement("div");
  div.innerHTML = song_data;
  // console.log(song_data_div.innerHTML=song_data)
  let song_arr = div.getElementsByTagName("a");
  let newarr = [];
  let arr = [];
  for (let i = 0; i < song_arr.length; i++) {
    if (song_arr[i].href.endsWith(".mp3")) {
      let newarr = [song_arr[i].href.split("/songs/")[1]];

      let string = newarr.join("");

      let p1 = string.replaceAll("%20", " ");
      let p2 = p1.replaceAll(".mp3", "");
      arr.push(p2);
    }
  }

  // console.log(arr)
  return arr;
}
const play_song = (track = "CUTE DEPRESSED") => {
  currentMusic.src = `Songs\\${track}.mp3`;
  currentMusic.play();
  document.getElementById("play").src = "controls\\pause.svg";
  document.getElementById("song-info").innerHTML = track;
};

async function main() {
  let get = await getsongs();
  // let plays=new Audio("Songs\\DNA .mp3");
  // plays.play();

  // let song = new Audio(get[4]);

  for (const i of get) {
    let song = document.getElementById("song-list");
    song.innerHTML =
      song.innerHTML +
      `<div class="songcard">
                        <img class="invert songcard_img1" src="controls/music.svg" alt="music logo">
                        <div class="songinfo">
                            <div class="song__name" id="song__name">
                                ${i}
                            </div>
                        </div>
                        <img class="songcard_img2" src="controls/play.svg" alt="">
                        
                    </div>`;
  }
  for (let i = 0; i < get.length; i++) {
    let test = document.querySelector(".song-list").children[i];
    test.addEventListener("click", () => {
      let track = test.innerText;

      play_song(track);
    });
  }
  let a = 0;
  document.getElementById("play").addEventListener("click", () => {
    if (currentMusic.paused) {
      document.getElementById("play").src = "controls\\pause.svg";

      currentMusic.play();
      if (a == 0) {
        play_song();
        a++;
      }
    } else {
      document.getElementById("play").src = "controls\\play.svg";
      currentMusic.pause();
    }
  });
  currentMusic.addEventListener("timeupdate", () => {
    let duration = currentMusic.duration;
    let current_time = currentMusic.currentTime;
    document.getElementById("current_time").innerHTML=`${secondsToMinutesSeconds(current_time)} :`
    document.getElementById("duration").innerHTML=secondsToMinutesSeconds(duration); 

    document.querySelector(".circle").style.left =(current_time/duration)*100+"%";
  });


  // seekbar function 



  document.querySelector(".sickbar").addEventListener("click",e=>{
    let percentage=(e.offsetX/e.target.getBoundingClientRect().width)*100
    document.querySelector(".circle").style.left=percentage + "%";
    currentMusic.currentTime = ((currentMusic.duration)*percentage)/100
    
  })
  document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left ").style.backgroundColor='black';
    document.querySelector(".left").style.left="0px";
    
  })
}





main();
