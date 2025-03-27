import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://grocery-app-383cf-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const groceryList = ref(database, "groceryList")
console.log(app)

const addItem2GroceryList = (inputId, inputName) => {
    let newItem = document.createElement('li')
    newItem.textContent = inputName
    newItem.addEventListener('click',()=>{
        let itemLocation = ref(database,`groceryList/${inputId}`)
        remove(itemLocation)
    })
    shoppingList.append(newItem)
}

onValue(groceryList, (snapshot)=>{
    if(snapshot.exists()){
        let currentGroceryList = Object.entries(snapshot.val())
        shoppingList.innerHTML=""
        for(let item of currentGroceryList) {
            let itemId=item[0]
            let itemName=item[1]
            addItem2GroceryList(itemId, itemName)
        }
    }
    else{
        shoppingList.innerHTML="<p> No items exist</p>"
    }

    console.log(currentGroceryList)
})

let addButton = document.getElementById("add-button")
let inputField = document.getElementById("input-field")
let shoppingList = document.getElementById("shopping-list")

addButton.onclick = () => {
    let inputValue = inputField.value
    if(inputValue!=="") {
        push(groceryList, inputValue)
        console.log(`added ${inputValue} to Database`)
    }
    inputField.value=""
}

