async function getsongs() {
    let songs = await fetch("http://127.0.0.1:3000/songs/");
    let song_data = await songs.text();
    let div = document.createElement("div");
    div.innerHTML = song_data;
    // console.log(song_data_div.innerHTML=song_data)
    let song_arr = div.getElementsByTagName("a");
    let newarr=[];
    let arr = [];
    for (let i = 0; i < song_arr.length; i++) {
        if (song_arr[i].href.endsWith(".mp3")) {
            let newarr=[song_arr[i].href.split("/songs/")[1]];
            
            let string=newarr.join("");
            
            let p1=string.replaceAll("%20"," ");
            let p2=p1.replaceAll(".mp3","");
            arr.push(p2)


            
            
        }
        
    }
    
    // console.log(arr)
    return arr;
}

async function main() {
    let get = await getsongs();
    
    console.log(get)
   
    // let song = new Audio(get[4]);   

   for (const i of get) {
        let song=document.getElementById("song-list");

        song.innerHTML=song.innerHTML+`<div class="songcard">
                        <img class="invert songcard_img1" src="controls/music.svg" alt="music logo">
                        <div class="songinfo">
                            <div class="song__name">
                                ${i}
                            </div>
                        </div>
                        <img class="songcard_img2" src="controls/play.svg" alt="">
                    </div>`

   }

}

main();


