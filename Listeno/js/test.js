let currentSong=new Audio();
let play=document.querySelector("#play")

async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  // directory mein se fetch kiya kyuki backend server nhi hai
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
      // songs baad tha jo url mein wahi le liya
      //ye array dega song ke pehle ka aur baad ka songs ke
      //1 liye matlab khali 1 index jiki song baad hai
    }
  }
  return songs;
  //    kyuki bhar bhi isse use kar sake
}
const playMusic=(track)=>{
  // let audio = new Audio("/songs/" + track)
  //songs dalana zaruri kyuki track song folder mein hai

  currentSong.src="/songs/" + track
  //humne current song Audio ka ka ek object bana liya global mein
  //kyuki humein ek bar ek he song play karna tha 
  //ye har bar new src store karega click par jo play hoga
  currentSong.play()
  play.src="pause.svg"

  //   var audio = new Audio(songs[0]);
//   audio.play();
//   // Audio ek class jisse hum song play kar sakte hai aur iske method jaise duration,currentSrc,currentTime
//   // use kar sakte hai
//   audio.addEventListener("loadeddata", () => {
//     console.log(audio.duration, audio.currentSrc, audio.currentTime);
//     // duration in sec
//   });
}

// kyuki async kuchh return kar rha isliye function banke store karenga
async function main() {
 
  // get the list of all songs
  let songs = await getSongs();
  console.log(songs);
  let songUl = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  // 0 ka matlab parent node
  for (const song of songs) {
    songUl.innerHTML =
      songUl.innerHTML +
      `<li><img class="invert" src="music.svg" alt="">
                            <div class="info">
                                    <div>${song.replaceAll("%20", " ")}</div>
                                    <div>Seedhe Maut</div>
                                </div>
                                <img class="invert" src="play.svg" alt="">
        </li>`;
    // replaceall karne se jeetne bhi %20 hai url mein wo replace hojayenge  space se
  }





//attach an event listener to each song
//songs ek array isliye hum array.from se select karange array element
//ye har li pe event listener lagyega

Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
  e.addEventListener("click",element=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML)
    playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    //trim kyuki ismein space ajata aspas jisse audio samajh nhi pata ke konsa song hai isliye trim use kiya

  })
})

//attach an event listener to play ,next,and previous
play.addEventListener("click" , ()=>{
  if(currentSong.paused){
    currentSong.play()
    play.src="pause.svg"
  }
  else{
    currentSong.pause
    play.src="play.svg"
  }
})

}
main();
