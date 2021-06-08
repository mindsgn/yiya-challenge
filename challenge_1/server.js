const https = require('http');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});;
const API = 'ac7df731'
// search parameters used to query API
let id = null; // movie id
let title = null; // movie title
let type = null; // Type of result to return. movie, series, episode
let year = null; // Type of result to return. movie, series, episode
let plot = null; // Type of result to return. movie, series, episode

let link = '';

const getTitle = () => {
    try{
        readline.question(`Hi, what movie would you like to search for? `, (input) => {
            if(input){
                search(input);
            }else{
                getTitle();
            }
       });
    }catch(error){
        console.log(error);
    }
};

const getTags = () => {
    try{
        const args = process.argv.slice(2);
        if(!args[0]){
           getTitle();
        }
    }catch(error){
        console.log(error);
    }
};

const search = async (input) => {
    try{
        const link = `http://www.omdbapi.com/?&apikey=${API}&t=${input}&r=json`;

        let data = null;
        
        await https.get(link, (response) => {
            // called when a data chunk is received.
            response.on('data', (chunk) => {
                data += chunk;
            });

            // called when the complete response is received.
            response.on('end', () => {
                if(data){
                    console.log((data))
                    getTitle();
                }
            });

        }).on("error", (error) => {
            console.log("Error: " + error.message);
        });
    }catch(error){
        console.log(error);
    }
};

//start program
getTags();