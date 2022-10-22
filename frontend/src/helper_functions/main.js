import axios from 'axios';


export const main = () => {

  // document.body.innerHTML = window.getSelection().toString();
  
  
  function getReading(header){
    console.log(header)
    console.log(axios);
    // setTruthiness(0.5)
    if (header !== "") {
        axios.post('http://localhost:8000/header', header)
            .then(function(response){
                console.log(response);
                console.log('tomato');
                document.body.innerHTML = "response"
                
       //Perform action based on response
        })
        .catch(function(error){
            console.log(error);
       //Perform action based on error
        });
    } else {
        alert("The search query cannot be empty")
    }
  }

  getReading({"poly": "helloooo"});


  console.log(2323);
};