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
    const names = data.BRANCHES.BRANCH.filter(branch => branch.Bank_Name[0].includes(characters));
    res.send(names)
})

app.get("/branches", async (req, res)=>{

    const {Bank_Name, Bank_Code} =  req.body;
    const branches = data.BRANCHES.BRANCH.filter(branch=> branch.Bank_Name[0] === Bank_Name || branch.Bank_Code[0] === Bank_Code)

    res.send(branches)

})

app.get("bank/:Bank_Name(*)/:Branch_Code", async (req, res)=>{
    console.log(req.params)
    const {Bank_Name, Branch_Code} =  req.params;
    const bank = data.BRANCHES.BRANCH.find(branch=> branch.Bank_Name[0] === Bank_Name && branch.Branch_Code[0] === Branch_Code)
    // const trr = bank.filter(st=> st === true);
    // console.log(data.BRANCHES.BRANCH[0].Branch_Code )
    // console.log(trr)

    res.send(bank)

})



getXml();


app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`)
})