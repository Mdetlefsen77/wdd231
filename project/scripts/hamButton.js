const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", (event) => {
  event.preventDefault(); 
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
});
