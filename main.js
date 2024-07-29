// declare variables
const btn = document.getElementById("btn");
const output = document.getElementById("output");
// IMPORTANT - Get your own free API token from https://www.stockdata.org/
const apiToken = 'N9cbbcb2mG2PtsxzoKTbfAp7DY1HwBoCq5R8sy2O';

// aysnc fucntion to fetch stock data from API
async function getStockData(){
    // take symbol from the input field
    const symbol = document.getElementById("input").value;

    // declare the url using api link, symbol and token
    let apiUrl = "https://api.stockdata.org/v1/data/quote?symbols="+ symbol +"&api_token=" + apiToken;
    
    try{
        // return the fetched promise as json
        const response = await fetch(apiUrl);
        // convert response to json format
        const data = await response.json();
        // extract and name variables from response
        let stock = data["data"][0];
        let name = stock["name"];
        let ticker = stock["ticker"];
        let exchange = stock["exchange_short"];
        let price = stock["price"];
        let currency = stock["currency"];
        let previous = stock["previous_close_price"];
        let change = stock["day_change"];

        // results to be displayed
        const result = `
        <p><b>Ticker:</b> ${ticker}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Exchange:</b> ${exchange}</p>
        <p><b>Price:</b> <span id="price">${price}</span> ${currency}</p>
        <p><b>Previous price:</b> ${previous} ${currency}</p>
        <p><b>Change:</b> <span id="change">${change}%</span></p>
        `;

        // display results in document
        output.innerHTML = result;

        // make text green if increase, and red if decrease
        if (change > 0){
            document.getElementById("price").classList.add("green-day");
            document.getElementById("change").classList.add("green-day");
        } else if ( change < 0){
            document.getElementById("price").classList.add("red-day");
            document.getElementById("change").classList.add("red-day");
        }

    } catch(e){
        console.log("Error!");
        console.log(e);
        // ask for a valid symbol if not fetch fails on that symbol
        output.innerHTML = `<p>${symbol} Not found. Please enter a valid symbol.</p>`;
    }
};

// run function when button is clicked
// btn.addEventListener("click", function(){
//     getStockData();
// }); 
