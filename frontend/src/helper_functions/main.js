export const main = () => {

  // document.body.innerHTML = window.getSelection().toString();



  function handlePostQuery(header){

    if (header != "") {
        axios.post('http://localhost:8000/header', header)
            .then(function(response){
                console.log(response);
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

  handlePostQuery({"poly": "helloooo"});


  console.log(2323);
};