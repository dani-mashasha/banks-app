const display = document.getElementById("display") ;
const myForm = document.getElementById("myForm") ;

const search = document.getElementById("search");
const matchList = document.getElementById("matchList");
const select = document.getElementById("branchList")
// const bankDiv = document.getElementById("bankDiv");

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

const displayBank = (bank) =>{
    console.log(bank)
    display.innerHTML="";
    const bankDiv = document.createElement("div");
    bankDiv.setAttribute("id", "bankDiv");

    const h2 = document.createElement("h2");
    h2.innerHTML = `${bank.Bank_Name[0]} - ${bank.Branch_Name[0]}` 


    const p = document.createElement("p");
    p.innerHTML = `מספר בנק: ${bank.Bank_Code[0]}<br><br>
    כתובת : ${bank.Branch_Address[0]}, ${bank.City[0]} <br><br>
    מיקוד: ${bank.Zip_Code[0]}<br><br>
    טלפון: ${bank.Telephone[0]}<br><br>
    פקס: ${!bank.Fax[0]?  "אין ":  bank.Fax[0]}<br><br>
    גישה לנכים: ${bank.Handicap_Access[0]}<br><br>
     ${bank.day_closed[0]&& `הסניף סגור:${bank.day_closed[0]} ` }`

    bankDiv.append(h2, p);
    display.append(bankDiv)



}

myForm.addEventListener("submit",async (e) => {
    e.preventDefault()
    const bankName = search.value
    const branchCode = select.value
    await fetch(`http://localhost:3000/${bankName}/${branchCode}`)
    .then(response => response.json())
    .then(data => displayBank( data));
})


search.addEventListener("input", (e) => searchBanks(e))


