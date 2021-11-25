const myForm = document.getElementById("myForm") ;
const search = document.getElementById("search");
const matchList = document.getElementById("matchList");
const select = document.getElementById("branchList")

const selectBranches=(data) =>{
    select.innerHTML="";
    data.map(branchNum => {
        let op = document.createElement("option");
        op.text= branchNum;
        op.value = branchNum;
        select.append(op)
    })
}

const options =  async (e) => {
    const {value} = e.target
    search.value = value;
    matchList.innerHTML="";
    await fetch(`http://localhost:3000/branches/${value}`)
    .then(response => response.json())
    .then(data =>selectBranches( data));
}

const auto = (data) => {
    matchList.innerHTML=""
    data.map((bankName) => {
        let op = document.createElement('option');
        op.text = bankName;
        op.value = bankName;
        op.addEventListener('click', (e) => options(e) )
        matchList.append(op)
    })
}

const searchBanks = async (e)=>{
    e.preventDefault() 
     const {value} = e.target
     await fetch(`http://localhost:3000/${value}`)
    .then(response => response.json())
    .then(data => auto( data));
}

myForm.addEventListener("submit",async (e) => {
    e.preventDefault()
    const bankName = search.value
    const branchCode = select.value
    await fetch(`http://localhost:3000/${bankName}/${branchCode}`)
    .then(response => response.json())
    .then(data => console.log( data));
})


search.addEventListener("input", (e) => searchBanks(e))


