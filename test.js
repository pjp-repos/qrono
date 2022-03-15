#! /usr/bin/env node

const fs = require('fs');

const loadJsonFile = (fileName)=>{
    try{
        let rawdata = fs.readFileSync(fileName);
        let data = JSON.parse(rawdata);
        return data;
    }catch(err){
        console.log(err);
    }
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace }

}

const locate = (data,param)=>{
    const select = data.results.filter(el=>el.address.state===param.toUpperCase());
    mapNames(select);
};

const find_price_lte = (data,param)=>{ 
    if(isNumeric(param)){
        const select = data.results.filter(el=>parseFloat(el.price)<=param);
        mapNames(select);
    }else{
        console.log(`Param ${param} is not a valid number`)
    }   
};

const find_price_gt = (data,param)=>{
    if(isNumeric(param)){
        const select = data.results.filter(el=>parseFloat(el.price)>param);
        mapNames(select);
    }else{
        console.log(`Param ${param} is not a valid number`)
    } 
};

const mapNames = (array)=>{
    const onlyNames = array.map(el=>el.name);
    console.log(onlyNames.join(', '));
}

const prosessCli = (args)=>{
    if(args[2]){
        const fileName = args[2];
        const data = loadJsonFile(fileName);
        if(args[3]){
            const command = args[3];
            if(args[4]){
                const param = args[4];
                //console.log(`FileName: ${fileName} , command: ${command} , parameter: ${param}`)
                switch(command){
                    case 'locate':
                        locate(data,param);
                        break;
                    case 'find_price_lte':
                        find_price_lte(data,param);
                        break;
                    case 'find_price_gt':
                        find_price_gt(data,param);
                        break;
                    default:
                        console.log("Command not found");
                }
            }else{
                console.log("Param is missing");
            }
        }else{
            console.log("Command is missing");
        }
    }else{
        console.log("Json filename is missing");
    }
}

prosessCli(process.argv);