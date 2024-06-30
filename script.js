async function getsongs() {
    let songs = await fetch("http://127.0.0.1:3000/songs/");
    let song_data = await songs.text();
    let div = document.createElement("div");
    div.innerHTML = song_data;
    // console.log(song_data_div.innerHTML=song_data)
    let song_arr = div.getElementsByTagName("a");
    let arr = [];
    for (let i = 0; i < song_arr.length; i++) {
        if (song_arr[i].href.endsWith(".mp3")) {
            arr.push(song_arr[i].href.split("/songs/")[1])
            
            
        }
    }
    
    // console.log(arr)
    return arr;
}

async function main() {
    let get = await getsongs();
    
    console.log(get)
   
    // let song = new Audio(get[4]);   

//    for (const i of get) {
//         let song=document.getElementById("song_name").getElementsByTagName("ul")[0];
//         song.innerHTML=song.innerHTML + `<li> ${i} </li>`
//    }

}

main();


