const boardElem = document.querySelector<HTMLElement>("#game-board") ;


// variables
let cols:number ,rows:number;
let prevNum : number;
//functions





function initializeBoard():void {
  const size = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--bubble-size"));

  if(boardElem){
        cols = Math.floor((boardElem?.clientWidth -20 ) / (size+10));
        rows = Math.floor((boardElem?.clientHeight - 20 )  / (size +10));
  }
  for(let row = 0; row <  rows; row++){
    for(let col = 0 ; col <cols ; col++){
      const bubble = document.createElement("div");
      bubble.classList.add("bubbles")
      bubble.textContent = Math.floor(Math.random() * 10).toString();
      boardElem?.appendChild(bubble);
    }
  }
}
initializeBoard();

boardElem?.addEventListener("click", (e)=>{
  const target = e.target as HTMLElement;
  if(e.target === null) throw new Error("null ")
  if(target.id === "game-board") return;
  target.style.backgroundColor = "green"
})
