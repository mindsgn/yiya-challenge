const https = require('http');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});;
const API = 'ac7df731';

const getTitle = () => {
    try{
        readline.question(`Hi, what movie would you like to search for? `, (input) => {
            if(input){
                if(input==="exit();"){
                    console.log("thank you for using our service, Good bye.")
                    process.exit()
                }else{
                    search(input);
                }
            }else{
                getTitle();
            }
       });
    }catch(error){
        console.log(error);
        getTitle();
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
        getTitle();
    }
};

const search = async (input) => {
    try{
        const link = `http://www.omdbapi.com/?&apikey=${API}&t=${input}&r=json`;
        let data = ``;
        await https.get(link, (response) => {
            // called when a data chunk is received.
            response.on('data', (chunk) => {
                data += chunk;
            });
            // called when the complete response is received.
            response.on('end', () => {
                if(data){
                    console.clear();
                    console.log("================================================================================")
                    console.log("SEARCH RESULTS FOUND FOR: ", input)
                    console.log("================================================================================")
                    console.log(JSON.parse(data))
                    console.log("\n")
                    console.log("\n")
                    getTitle();
                }
            });
        }).on("error", (error) => {
            console.log("Error: " + error.message);
        });
    }catch(error){
        console.log(error);
        getTitle();
    }
};

//start program
getTags();