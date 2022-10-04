// function main() {

// }
// module.exports = { main }
const listContainer = document.querySelector(".list_container");
const modal = document.querySelector(".modal");

const characters =[
    "1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg","8.jpeg","9.jpeg","10.jpeg"
]

const url = "https://swapi.dev/api/people";
const fetchZemiData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    console.log(results);
    // for (result of results) 

    results.forEach((result, i)=>{

        const detailsBox = document.createElement("div");
        detailsBox.setAttribute("class", "detailsBox");
        const listItem = document.createElement("h1");
        listItem.textContent = result.name;

        const modalContent = document.createElement("div");
        modalContent.setAttribute("class", "modal_content");

        const charName = document.createElement("h1");
        charName.textContent ="Name :"+ result.name;
        const charHeight = document.createElement("h1");
        charHeight.textContent ="Height: "+ result.height;
        const charGender = document.createElement("h1");
        charGender.textContent ="Gender :"+ result.gender;



        const image = document.createElement("img");
        image.setAttribute("class", "zemi_image")
        image.setAttribute("src", `${characters[i]}`);


        const modalImg = document.createElement("img");
        modalImg.setAttribute("class", "modalImg")
        modalImg.setAttribute("src", `${characters[i]}`)


        detailsBox.appendChild(image);
        detailsBox.appendChild(listItem);
        listContainer.appendChild(detailsBox);

        
        listItem.addEventListener("click", ()=>{
            modal.classList.add("show_modal");
            modalContent.appendChild(modalImg);
            modalContent.appendChild(charName);
            modalContent.appendChild(charHeight);
            modalContent.appendChild(charGender);
            modal.appendChild(modalContent);

        })
       
    }

    )

}
fetchZemiData();

 
window.addEventListener("click", (e)=>{
    if(e.target === modal){
        modal.classList.remove("show_modal");
        modal.innerHTML = " ";
    }
})