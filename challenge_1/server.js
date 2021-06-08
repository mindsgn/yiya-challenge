const getData = async() => {
    try{
        let url = `https://www.omdbapi.com/?i=tt3896198&apikey=ac7df731`;
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();
            console.log(json)
        } else {
            alert("HTTP-Error: " + response.status);
        }
    }catch(error){
        console.log(error)
    }
};

getData();