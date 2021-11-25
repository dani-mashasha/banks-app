const express  = require("express")
const https = require('https');
const xmlData =  'https://www.boi.org.il/he/BankingSupervision/BanksAndBranchLocations/Lists/BoiBankBranchesDocs/snifim_dnld_he.xml'
const xml2js = require('xml2js');
const cors = require('cors')

const parser = new xml2js.Parser();

const port = 3000;

const app = express();
app.use(express.json()) 
app.use(cors())



let data;

const ParsXml = (xml) => {
    parser.parseString(xml.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, '&amp;'), (err, result) => {
        if(err) {
            console.log('Err');
            console.log(err);
        } else {
            console.log('Done');
            data= JSON.stringify(result);
            data= result;

            
        }            
    });
}


 const getXml = () =>{
    let xml='';
    https.get(xmlData, (res) => {
    res.on('error',  (err)=> {
        console.log('Error while reading', err);
        return err
    });
    res.on("data", (data) =>{
        xml += data
    })
    res.on("end", ()=>{
        console.log("xml ok")
        ParsXml(xml)
        
    })


})
}

app.get("/", (req, res) => {
    res.send("HOME")
})

app.get("/:characters", async (req, res)=>{
    const {characters} = req.params;
    const namesList = []
    data.BRANCHES.BRANCH.map(branch => branch.Bank_Name[0].includes(characters) && !namesList.includes(branch.Bank_Name[0])? namesList.push(branch.Bank_Name[0]): null);
    res.send(namesList)
})

app.get("/branches/:bankName(*)", async (req, res)=>{
    const branches= []
    const {bankName} =  req.params
    data.BRANCHES.BRANCH.map(branch=> branch.Bank_Name[0] === bankName? branches.push(branch.Branch_Code[0]): null)
    branches.sort(function(a, b){return a-b})
    res.send(branches)

})

app.get("/:bankName(*)/:branchCode", async (req, res)=>{
    console.log(req.params)
    const{ bankName,branchCode}=  req.params;
    console.log(bankName, branchCode)
    const bank = data.BRANCHES.BRANCH.find(branch=> branch.Bank_Name[0] === bankName && branch.Branch_Code[0] === branchCode)
    res.send(bank)

})



getXml();


app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`)
})