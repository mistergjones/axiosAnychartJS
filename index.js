async function getData(e) {
    console.log("Hello Gleeeen");

    try {
        // const response = await axios.get("https://api.github.com/users/mapbox");
        // const response = await axios.get("https://api.coincap.io/v2/assets");

        // obtain historical prices for bitcoin
        const historicalBitcoinData = await axios.get(
            "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=1577797200000&end=1580475600000"
        );

        //obtain Historical Prices for Ethereum
        const historicalEthereumData = await axios.get(
            "https://api.coincap.io/v2/assets/ethereum/history?interval=d1&start=1577797200000&end=1580475600000"
        );

        // Format the Bitcoin data returned into an object with 2 arrays. Used for plotting graphs
        var { dataPoints, dataLabels } = massageData(
            historicalBitcoinData.data.data
        );

        // plot bitcoin chart
        bitcoinChart(dataLabels, dataPoints);

        // Format the Bitcoin data returned into an object with 2 arrays. Used for plotting graphs
        // var ethereumData = massageData(historicalEtheriumData.data.data);
        var { dataPoints, dataLabels } = massageData(
            historicalEthereumData.data.data
        );
        ethereumChart(dataLabels, dataPoints);

        // CHART the made-up PRICE and RSI chart
        priceAndRSI();

        // chart the CANDLESTICK CHART
        candlestickChart();
    } catch (error) {
        console.log("The error was: ", error);
    }
}

function massageData(dataObject) {
    // Show all the keys and value of the object
    // for (const [key, value] of Object.entries(dataObject)) {
    //     console.log(`${key}: ${value}`);
    // }

    // loop through each object and obtain the priceUsd and date keys and values
    var dataLabels = [];
    var dataPoints = [];

    for (i = 0; i < dataObject.length; i++) {
        // console.log(dataObject[i].priceUsd);
        dataPoints.push(dataObject[i].priceUsd);
        dataLabels.push(dataObject[i].date.substring(0, 10));
    }

    // draw the graph with the data arrays as arguments
    // bitcoinChart(dataLabels, dataPoints);
    return {
        dataPoints: dataPoints,
        dataLabels: dataLabels,
    };
}

function bitcoinChart(labels, dataPoints) {
    // const labels = [
    //     "01/01",
    //     "02/01",
    //     "03/01",
    //     "04/01",
    //     "05/01",
    //     "06/01",
    //     "07/01",
    //     "08/01",
    //     "09/01",
    //     "10/01",
    //     "11/01",
    //     "12/01",
    // ];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Bitcoin Daily Price",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                // data: [7, 19, 15, 7, 11, 15, 2, 17, 13, 8, 12, 20, 30, 23],
                data: dataPoints,
            },
        ],
    };

    const config = {
        type: "line",
        data,
        options: {},
    };

    var myChart = new Chart(document.getElementById("myChart1"), config);
}

function ethereumChart(labels, dataPoints) {
    // const labels = [
    //     "01/01",
    //     "02/01",
    //     "03/01",
    //     "04/01",
    //     "05/01",
    //     "06/01",
    //     "07/01",
    //     "08/01",
    //     "09/01",
    //     "10/01",
    //     "11/01",
    //     "12/01",
    // ];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Ethereum Daily Price",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                // data: [57, 49, 35, 57, 61, 33, 78, 56, 65, 55, 66, 77, 51, 49],
                data: dataPoints,
            },
            {
                label: "Upper Bollinger",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 199, 132)",
                data: [
                    167,
                    159,
                    145,
                    167,
                    171,
                    188,
                    188,
                    165,
                    176,
                    177,
                    180,
                    180,
                    170,
                    177,
                    187,
                    189,
                    185,
                    187,
                    181,
                    188,
                    188,
                    200,
                    205,
                    197,
                    190,
                    190,
                    199,
                    185,
                    195,
                    198,
                    205,
                ],
            },
            {
                label: "Upper Bollinger",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(155, 199, 132)",
                data: [
                    127,
                    119,
                    105,
                    127,
                    131,
                    128,
                    128,
                    125,
                    116,
                    127,
                    130,
                    140,
                    130,
                    137,
                    147,
                    149,
                    145,
                    147,
                    141,
                    148,
                    148,
                    140,
                    145,
                    137,
                    150,
                    150,
                    134,
                    133,
                    145,
                    158,
                    145,
                ],
            },
        ],
    };

    const config = {
        type: "line",
        data,
        options: {},
    };

    var myChart = new Chart(document.getElementById("myChart2"), config);
}

function priceAndRSI() {
    const labels = [
        "01/01",
        "02/01",
        "03/01",
        "04/01",
        "05/01",
        "06/01",
        "07/01",
        "08/01",
        "09/01",
        "10/01",
        "11/01",
        "12/01",
    ];
    const data = {
        labels: labels,
        datasets: [
            {
                type: "line",
                label: "Ethereum Price",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(1, 1, 1)",
                data: [57, 49, 35, 57, 61, 33, 78, 56, 65, 55, 66, 77, 51, 49],
            },
            {
                type: "bar",
                label: "RSI",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 199, 132)",
                data: [17, 19, 15, 17, 23, 16, 22, 23, 22, 21, 7, 34, 12, 38],
            },
        ],
    };

    const config = {
        data,
        options: {},
    };

    var myChart3 = new Chart(document.getElementById("myChart3"), config);
}

function candlestickChart() {
    // load data
    anychart.data.loadCsvFile(
        "https://static.anychart.com/git-storage/word-press/data/candlestick-chart-tutorial/EUR_USDHistoricalData2year.csv",
        function (data) {
            // create a data table
            var dataTable = anychart.data.table(0, "MMM d, yyyy");
            dataTable.addData(data);

            // map data
            var mapping = dataTable.mapAs({
                open: 2,
                high: 3,
                low: 4,
                close: 1,
            });

            // set the chart type
            var chart = anychart.stock();

            // set the series
            var series = chart.plot(0).candlestick(mapping);
            series.name("EUR USD Trade Data");

            // set the chart title
            chart.title("EUR USD Historical Trade Data");

            // set the container id
            chart.container("container");

            // draw the chart
            chart.draw();

            // create am EMA plot
            var plot = chart.plot(0);

            // create an EMA indicator with period 20
            var ema20 = plot.ema(mapping, 20).series();

            // set the EMA color
            ema20.stroke("#bf360c");

            // create am EMA plot
            var plot = chart.plot(0);

            // create an EMA indicator with period 5
            var ema5 = plot.ema(mapping, 5).series();

            // set the EMA color
            ema5.stroke("blue");
        }
    );
}
