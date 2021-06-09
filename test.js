const fs = require('fs');
let number = 0;
let lines = null;
let folder = `./`

let errors = 0; 

const crawlFolder = () => {
    try {
        const files = fs.readdirSync(folder)
        for(let file of files) {
            let filename = null; 
            if(file.slice(-3)===".js"){
                filename = `./${file}`;
                readFile(filename);
            }
        }
      } catch(error) {
        console.log(error)
    }
}

//read file
const readFile = (filename) => {
    try{
        fs.readFile(filename, 'utf8', (err,data) => {
            //if there is an return error  
            if (err) {
                return console.log(err);
            }
            lines = data.split(/\r\n|\n/);
            for(let line of lines) {
                number ++;
                checkLine(line, number, filename);
            }
        });
    }catch(error){
        return console.log(error);
    }   
}

//chack each line if it consists const or let
const checkLine = (line, number, filename) => {
    try{
        let words = line.split(/(\s+)/);
        let position = 0;
        for(let word of words) {
            if(word==="const" || word==="let"){
               return flag(position, words, number, filename);
            }
            position ++;
        }
    }catch(error){
        return console.log(error)
    }
}

//flag follow the rules to inspect if correct then flag
const flag = (position, words, number, filename) => {
    let error = [];   
    if(words[position+6] === "()" || words[position+6] === "async"){
        //console.log("no Space");
    }else{
            //check if there are spaces
            if(words[position+3] === " " && words[position+4] === "=" && words[position+5] === " "){
                //console.log("space");
                error[0] = false;
            }else{
                error[0] = true;  
            }

            const len = words.length - 1;

            if(words[len].slice(-1)===";"){
                error[1] = false;
            }else{
                error[1] = true;
            }
            
            if(error[0] && error[1]){
                console.log(`- ${filename} error on line ${number}: no Space and semi colon`);
            }

            else if(error[0]){
                console.log(`- ${filename} error on line ${number}: no Space`);
            }

            else if(error[1]){
                console.log(`- ${filename} error on line ${number}: semi colon`);
            }
        }
}

//start by crawling folder
crawlFolder();