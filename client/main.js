const myForm = document.getElementById("myForm") ;
const search = document.getElementById("search");
const matchList = document.getElementById("matchList");
const button = document.getElementsByTagName("button")


const auto = (data) => {
    const matchList = document.getElementById("matchList");
    data.map(bank => {
        let op = document.createElement('option');
        op.text = bank.Bank_Name;
        op.value = bank.Bank_Name;
    })


}

const searchBanks = async (e)=>{
    e.preventDefault() 
     const {value} = e.target
     const data =  await fetch(`http://localhost:3000/${value}`)
    .then(response => response.json())
    .then(data => auto( data));
    

}

myForm.addEventListener("submit", (e) => {
    e.preventDefault()

    console.log(e.target)
})


search.addEventListener("input", (e) => searchBanks(e))


