function saveToLocalStorage(event) {
    event.preventDefault();
    const Description = event.target.descrip.value;
    const Amount = event.target.amount.value;
    const Category = event.target.category.value;
    const obj = {
        Description,
        Amount,
        Category
    }
    axios.post("https://crudcrud.com/api/8d1e2a96921149a5857ad664de7bb486/expensetracker", obj)
    .then((response)=>{
        showNewUserOnScreen(response.data)
        console.log(response)
    })
    .catch((error)=>{
        console.log(error)
    })
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/8d1e2a96921149a5857ad664de7bb486/expensetracker')
    .then((response)=>{
        console.log(response)
        for(var i=0;i<response.data.length;i++){
            showNewUserOnScreen(response.data[i])
        }  
    })
    .catch((error)=>{
        console.log(error)
    })
})

function showNewUserOnScreen(user){
    document.getElementById('amount').value ="";
    document.getElementById('descrip').value ="";
    document.getElementById('category').value ="";
    // console.log(localStorage.getItem(user.emailId))
        if(localStorage.getItem(user.Amount) !== null){
             removeUserFromScreen(user.Amount)
        }
    const parentNode = document.getElementById('listOfExpense');

    const childHTML = `<li id=${user._id}> ${user.Amount} - ${user.Description} -${user.Category} 
    <button onclick=editUserDetails('${user.Amount}','${user.Description}','${user.Category}','${user._id}')> Edit </button>
    <button onclick=deleteUser('${user._id}')> Delete </button>
    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User
function editUserDetails(Amount, Description,Category,userid){
    document.getElementById('amount').value = Amount;
    document.getElementById('descrip').value = Description;
    document.getElementById('category').value = Category;
     deleteUser(userid)
     removeUserFromScreen(userid);
}

// deleteExpense

function deleteUser(userid){
    axios.delete(`https://crudcrud.com/api/8d1e2a96921149a5857ad664de7bb486/expensetracker/${userid}`)
    .then((response)=>{
        console.log(response)
        removeUserFromScreen(userid);
    })
    .catch((error)=>{
        console.log(error)
    })
}

function removeUserFromScreen(userid){
    const parentNode = document.getElementById('listOfExpense');
    const childNodeToBeDeleted = document.getElementById(userid);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
} 