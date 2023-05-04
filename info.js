curCard = -1;

cardHolder = document.getElementById("card-holder");
cards = document.getElementsByClassName("card");

window.addEventListener('load', function() {
  window.addEventListener("click", function(e) {
    tClasses = e.target.classList;
    if (tClasses != "card" && tClasses != "image") {
      SetOpen(curCard);
    }
  });
});

function SetOpen(openInt) {
  for (i = 0; i < cards.length; i++) {
    cards[i].style.width = "4rem";
    cards[i].style.boxShadow = "none";
    cards[i].firstElementChild.style.width = "2rem";
    cards[i].firstElementChild.style.color = "skyblue";
  }
  document.getElementById("card-holder").style.width = "22.5rem"
  
  if (openInt == curCard) {
    curCard = -1;
    cardHolder.style.boxShadow = "0 0 10px 3px lightgray";
  } else {
    document.getElementById("card-holder").style.width = "60rem"
    cards[openInt].style.width = "30rem";
    cards[openInt].style.boxShadow = "0 0 3px 3px white";
    cards[openInt].firstElementChild.style.width = "20rem";
    cards[openInt].firstElementChild.style.color = "black";
    cardHolder.style.boxShadow = "none";
    curCard = openInt;
  }
}