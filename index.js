
let savedItems = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const saveTab = document.getElementById("savetab-btn")
const deleteEl = document.getElementById("delete-btn")
const savedItemsFromLocalStrorage = JSON.parse(localStorage.getItem("savedItems")) 
const del = document.getElementById("delete")



if (savedItemsFromLocalStrorage){
    savedItems = savedItemsFromLocalStrorage
    render(savedItems)
}



function render (items) {
    let listItems = ""
    items.forEach(i => {
        listItems += `
        <li> 
            <a target='_blank' href=${i}> 
                ${truncate(i,60)}  
            </a>
            <img id="del" src="delete.png">

        </li>`
    })
    
    ulEl.innerHTML = listItems
}

// tab save
saveTab.addEventListener("click",function(){
    chrome.tabs.query({active:true, currentWindow:true }, function(tabs){
        const currentTab = tabs[0].url
        console.log(currentTab)
        savedItems.push(currentTab)
        localStorage.setItem("savedItems",JSON.stringify(savedItems))
        console.log(localStorage.getItem("savedItems"))
        render(savedItems)
    }) 
})

//input save
inputBtn.addEventListener("click",function(){
    savedItems.push(inputEl.value)
    localStorage.setItem("savedItems",JSON.stringify(savedItems))
    console.log(localStorage.getItem("savedItems"))
    inputEl.value =""
    inputEl.focus()
    render(savedItems)
})

//delete all
deleteEl.addEventListener("click",function(){
    let result = confirm("Do you want to delete all?")
    if (result){
        localStorage.clear()
        savedItems = []
        render(savedItems)
    }
   
})

//delete one item
ulEl.addEventListener("click",function(event){
    if (event.target.tagName.toLowerCase() === "img"){
        const button = event.target
        const li = button.parentNode
        let index = li.innerText.trim()
        // console.log(index)
        // for ( i=0; i<savedItems.length; i++){
        //     if (savedItems[i] === search){
        //         console.log("tr")
        //     }
        // }    
        savedItems.splice(savedItems.indexOf(index),1)
        localStorage.setItem("savedItems",JSON.stringify(savedItems))
        // console.log(savedItems)
        ulEl.removeChild(li)
    }
})


//shorten links
function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1)  : str;
  };


