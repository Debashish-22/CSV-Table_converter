# CSV-Table_converter
> It's a web application where we can upload CSV files to convert it into a Table and perform various operations like Searching, sorting, also we can display any column as a chart for better understanding of data. 

## Demo and Explanation

> [Video link]()

## Tech-Stack
* HTML, CSS (for frontend interface)
* Javascript, jQuery (for both frontend and backend)
* NodeJS and expressJS (for backend server)
* AJAX (to receive data  from server asynchronously)
* MongoDB (as database to store fles)

## Features
* Upload any CSV file into the system.
* Validation to upload only CSV files.
* Display a list of all uploaded CSV files.
* When the user selects a file, display all the data (with column headers) in a table on the page.
* There is a search box which searches on the front end itself and displays the matching rows of the table only (empty search box displays all the data).
* Sorting button (ascending and descending) on each column.
* Pagination of the data displayed in the table to a max of 100 records per page.
* Integrated a charting library [canvasJS](https://canvasjs.com/html5-javascript-column-chart/) to display a selected column as a chart.

## Usage Guide
1. Insatll [nodejs](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) on your system. check using following command in the terminal.
    ```
    $node -v
    $mongod --version
    ```
2. Open your terminal and run the following :
    ```
    cd CSV-Table_converter
    npm install
    npm start
    ```
 3. Now the Server runnning, open the link (http://localhost:8000) to acess the interface.
 4. Check out Samples folder for CSV files of dfifferent size to test.
