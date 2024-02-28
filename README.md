# Backend for Fugitive Capture Project

This is the backend server for the Fugitive Capture Project. It is responsible for handling cop selections, simulating the fugitive's location, and determining if the fugitive has been captured.

## Live Link: https://fugitive-capture-backend.vercel.app/

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework for Node.js used for building RESTful APIs.
- **body-parser**: Middleware for parsing incoming request bodies.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **JavaScript**: Programming language used for server-side development.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ankitsharma21598/fugitive-capture-backend.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd fugitive-capture-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

### Capture Fugitive Endpoint

- **URL**: `/capture`
- **Method**: POST
- **Request Body**:
  - `copSelections`: An array of cop selections containing cop name, selected city, and selected vehicle.
  - Example: 
      ```bash
      {
          "copSelections":[
        {
          "name": "Cop 1",
          "city": "Narmis City",
          "vehicle": "EV Car"
        },
        {
          "name": "Cop 2",
          "city": "Shekharvati",
          "vehicle": "EV SUV"
        },
        {
          "name": "Cop 3",
          "city": "Lihaspur",
          "vehicle": "EV Bike"
        }
      ]
      
      }
      ```
- **Response**:
  - Success (200 OK):
    - `capturingCop`: Details of the capturing cop if the fugitive is captured.
  - Error (400 Bad Request):
    - `error`: Error message if there are validation failures or no cop selections provided.

## Usage

To use the backend server, send POST requests to the `/capture` endpoint with cop selections in the request body. The server will simulate the fugitive's location and determine if the fugitive has been captured based on the provided cop selections.
