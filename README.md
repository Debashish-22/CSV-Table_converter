# CSV-Table_converter
> It's a web application where we can upload CSV( comma separated values) files to convert it into a Table and perform various operations like Searching, sorting, also we can display any column as a chart for better understanding of data. 

## Demo

> [Video demonstartion and explanation link]()

## Tech-Stack
* HTML, CSS (for frontend interface)
* Javascript, jQuery (for both frontend and backend)
* NodeJS and expressJS (for backend server)
* AJAX (to receive data  from server asynchronously)
* MongoDB (as database to store fles)
* [Multer](https://www.npmjs.com/package/multer) (for file uploading)
* [csv-parse](https://www.npmjs.com/package/csv-parse) (for parsing csv files into array based on delimiters)
* [canvasJS](https://canvasjs.com/html5-javascript-column-chart/) (for converting data into a chart)

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
1. Install [nodejs](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) on your system.
2. Open your terminal and run the following :
    ```
    cd CSV-Table_converter-main
    npm install
    npm start
    ```
 3. Now the Server runnning, open the link (http://localhost:8000) to acess the interface.
 4. Check out 'Samples' folder for CSV files of dfifferent size to test the application.

## Folder Structure
* app.js - Entry point of our application. This file defines our express server.
* assets - This folder contains static files like styles(css), scripts(js), icons.
* config - This folder contains configuration of Mongoose(schema and model), Multer(for file uploading), flash(for notification).
* controllers - This folder contains various functions to be executed when called through routes.
* models - This folder contains schema definition of our mongoose models.
* routes - This folder contains all the routes for our API.
* uploads - This folder will stor the uploaded files.
* views - This folder contains layout, partials and templates to be displayed to the user.
* Samples - This folder conatins some csv files of different size to test application.
