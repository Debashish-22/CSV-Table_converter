$(document).ready(function () {

    // data from csv file
    let storage = [];
    // large data will be stored as chunks
    let chunksStorage = [];
    let tableId = $('.table-responsive').attr('id');

    // we are slicing large data into chunks(100) helpful for pagination
    const sliceIntoChunks = (data, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            chunks.push(chunk);
        }
        return chunks;
    }

    // AJAX function to get data of csv file as array of arrays and storing them as chunks
    const tableData = () => {

        $.ajax({
            type: 'get',
            url: `/table/generate/${tableId}`,
            success: (data) => {
               
                storage = data.parsedData;
                // as header will be constatnt in all page so removing first data
                // this removed data will be shown by ejs as table header (refer to '_table.ejs', 'thead')
                storage.shift();
                chunksStorage = sliceIntoChunks(data.parsedData, 100);
            },
            error: (err) => {
                console.log(err.responseText)
            }
        })
    }

    tableData();

    // function that will craete and append table row and cell on receiving data on table body only.
    function updateTableBody(tableData){
        $('.tbody').empty();
        for (let i = 0; i <= tableData?.length; i++) {

            $('.tbody').append(`<tr>
                ${ tableData[i]?.map((cellData)=>{
                    return `<td>${cellData}</td>` 
                })}
            </tr>`);
        }
    }
    
    // SEARCHING DATA

    let filtered = new Set([])
    let filteredData = []

    $("#myInput").on("keyup", function() {
      
        var value = $(this).val().toLowerCase();
        filtered.clear();
        filteredData = [];
        storage.map((data)=>{
            
            data.map((innerData)=>{
                if(innerData.toLowerCase().includes(value)){
                
                    return filtered.add(data);
                }
            })
            return filtered;
        });
        // add all set data to the array
        filteredData = [...filtered];
        chunksStorage = sliceIntoChunks(filteredData, 100);
        currPage = 0;
        updateTableBody(chunksStorage[currPage]);
        if($('#myInput').val() == ""){
            return $('.numbered-page').show();
        }
        $('.numbered-page').hide();
    });

   
    // SORTING logic
    // since we are unaware of exact data type of table data we will perform both string and numeric comparison
    // we will apply sorting algorithm on entire(storage) data then sort 
    // finally we will slice them into chunks (because of pagination) and display data


    // ASCENDING SORT
    const ascendingSort = (storage, colNo) => {

        let ascStorage = storage.sort((a, b) => {
            // numeric comparison
            let compare = Number(a[colNo]) - Number(b[colNo])
            //  if numeric fails then string comparison
            if (isNaN(compare)) {
                compare = a[colNo].toLowerCase() > b[colNo].toLowerCase() ? 1 : -1
                return compare
            }
            return compare
        })
        chunksStorage = sliceIntoChunks(ascStorage, 100);
    }

    // DESCENDING SORT
    const descendingSort = (storage, colNo) => {
        let descStorage = storage.sort((a, b) => {
            // numeric comparison
            let compare = Number(b[colNo]) - Number(a[colNo])
            //  if numeric fails then string comparison
            if (isNaN(compare)) {
                compare = a[colNo].toLowerCase() < b[colNo].toLowerCase() ? 1 : -1
                return compare
            }
            return compare
        })
        chunksStorage = sliceIntoChunks(descStorage, 100);
    };

    // events to trigger sorting functions
    $('.ascending').on('click', function(){

        let colNo = $(this).attr('col');
        ascendingSort(storage, colNo);
        updateTableBody(chunksStorage[currPage]);
    });

    $('.descending').on('click', function(){

        let colNo = $(this).attr('col');
        descendingSort(storage, colNo);
        updateTableBody(chunksStorage[currPage]);
    });

    // PAGINATION
    // logic => every page no. will refer to the chunks in chunkStorage 
    // NOTE: chunksStorage is array so count start from 0 but pagination(frontend) starts from 1
    // e.g: if user clicks on page 2 so chunk[1] i.e chunk[2-1] data will be displayed and so on.
    // so, please actively check where we are perforimg +- 1 to get proper data from curr page and chunk storage

    // should be var so we can change it from local functions
    var currPage = 0;

    // toggling active class to logically display current page

    $(`[page=${currPage + 1}]`).toggleClass('active').siblings('li').removeClass('active')

    $('.next').on('click', () => {
       
        let lastPage = chunksStorage.length-1;
        // if user visits last page then return
        if(currPage >= lastPage){
            return;
        }
        currPage += 1;
        updateTableBody(chunksStorage[currPage])
        $(`[page=${currPage + 1}]`).toggleClass('active').siblings('li').removeClass('active')
    })
     
    $('.previous').on('click', () => {
       
        // if user on first page then no previous i.e return
        if(currPage === 0){
            return;
        }
        $(`[page=${currPage}]`).toggleClass('active').siblings('li').removeClass('active')
        currPage -= 1;
        updateTableBody(chunksStorage[currPage])
    })

    // changing global variable currPage based on clicked number page
    $('.numbered-page').on('click', function(){  
        
        $(this).toggleClass('active').siblings('li').removeClass('active')
        let pageNo = $(this).attr('page')
        updateTableBody(chunksStorage[pageNo-1]);
        currPage = Number(pageNo-1)
    })

    // CHART's

    // I have used CANVASJS a js charting library to create charts as i found it simple to use and show large data.
    // please refer to 'https://canvasjs.com/' for documentation
    let chartData = []

    $('.chart').on('click', function(){
      
        $('#chartContainer').show()
        chartData = []
        let col = $(this).attr('col')
        // we get user clicked column data from storage and convert it as object and puch it to chartData
        // to craete array of objects and will pass it as datapoints to craete chart function.
        storage.map((data)=>{
        
            let colData = data[col]
            let point = {y : Number(colData)}
            return chartData.push(point)
        })
        createChart(chartData)
    })

    function createChart(data) {

        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2", 
            data: [{        
                type: "column",  
                dataPoints: data,
            }]
        });
        chart.render();
    }

    // function to hide chart if clicked anywhere else on screen except chartContainer
    $(document).mouseup(function(e){
        var container = $("#chartContainer");   
        if(!container.is(e.target) && container.has(e.target).length === 0){
            container.hide();
        }
    });

    // Scroll to top
    $('.top').on('click', ()=>{
        window.scrollTo(0,0);
    })
});