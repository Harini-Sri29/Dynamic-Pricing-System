
## Dynamic Pricing System

The Dynamic Pricing System is a web-based application that adjusts product prices dynamically based on stock levels, demand, and competitor pricing. The system provides real-time insights into price changes and enables administrators to view and manually adjust prices. Users can interact with the system to browse products and view the latest dynamically calculated prices.
## Problem Statement
Modern e-commerce businesses face challenges in pricing products dynamically based on stock, demand, and competitors. Static pricing models fail to optimize revenue and customer satisfaction.


## Objective
The Dynamic Pricing System automates price adjustments to maximize profit while staying competitive. Admins have full control over analytics, while users experience fair pricing based on real-time market conditions.
## Features

## Admin Panel

![Admin Login](https://github.com/user-attachments/assets/2a82652f-54a4-4999-b9f6-55741fa4738b)

![Admin Dashboard](https://github.com/user-attachments/assets/cf7a80d0-61d7-4974-8d8f-1d5eb29ed79c)


1.View product pricing, stock, and demand trends.

2.Adjust prices manually or rely on automated algorithms.

3.Access analytics and demand forecasting graphs.
## User Interface

![User Registration](https://github.com/user-attachments/assets/cff6a432-19ac-4f28-b9e5-78d9e4f527a3)

![Registration Successful](https://github.com/user-attachments/assets/cc094d66-3830-420e-b328-c1f5bb8136fb)

1.Explore products with real-time pricing.

2.Add products to the cart and make purchases.
## Dynamic Pricing

![Update Prices Dynamically Based on Stock,Demand and Competitor Price](https://github.com/user-attachments/assets/b2998e6f-dc8f-40ed-aa9e-5c75868c55e2)

Prices adjust automatically based on:

1.Stock levels.

2.Demand patterns.

3.Competitor pricing.
## Forecasting and Analytics
![Visualize Forecasting](https://github.com/user-attachments/assets/ffa7fc9a-44fb-4a19-be97-6f328f78a9e8)


1.Graphs display future demand and inventory trends based on historical data.
## Technology Stack
Backend: Node.js, Express.js

Frontend: HTML, CSS, JavaScript

Database: MongoDB

Libraries: Mongoose, Chart.js

Version Control: Git
## Project Structure
DynamicPricingSystem/

├── node_modules/          # Installed dependencies

├── public/

│   ├── login.html         # Login page

│   ├── user.html          # User dashboard

│   ├── admin.html         # Admin panel

│   ├── images/            # Product images

│   └── forecasting.js     # Forecasting logic

├── package.json           # Project metadata

├── server.js              # Backend logic

└── README.md              # Documentation

## Setup and Installation
## Prerequisites
Node.js and npm installed.

MongoDB installed and running locally or on a cloud service.
## Installation Steps
Clone the repository:

    git clone https://github.com/your-username/dynamic-pricing-system.git
    cd dynamic-pricing-system

Install dependencies:

    npm install express mongoose
## Database Setup
1.Open MongoDB Compass.

2.Create a database: DynamicPricingDB.

![Dynamic Pricing DB](https://github.com/user-attachments/assets/297b8ff1-7b2d-407d-80aa-1f798d2c5166)

3.Create two collections:
 
 products (fields: name, price, stock, demand).

 ![MongoDB products Database](https://github.com/user-attachments/assets/9f39f41f-7f95-4188-80a6-b1b9b26192eb)

 users (fields: username, password).

 ![MongoDB users database](https://github.com/user-attachments/assets/30abf202-ba19-4b9c-a79b-04be34ad6eba)


4.Insert sample data into the collections.
## Run the Application

![Command Prompt ](https://github.com/user-attachments/assets/1ade9836-a220-408e-9e77-836cda32bfe7)

Start the server:

    node server.js

Open the application in your browser:

http://localhost:5000

## Usage
## Admin Functionalities
1.Login to the Admin Panel.

![Admin Login](https://github.com/user-attachments/assets/0f548f79-06c0-405c-a507-4c5683c95394) 

![Admin Dashboard](https://github.com/user-attachments/assets/b5475f04-9ae5-4341-b7a3-fd0ade07d920)


2.View product list with price, stock, and demand.

![Load Products in Admin Dashboard](https://github.com/user-attachments/assets/3b4f8d77-bd83-4b10-9f7d-a20e9c016f99)

3.Add new product

![Adding New Product](https://github.com/user-attachments/assets/1ea3f15c-c2a2-41e5-99ee-488d382dc0ca)

![Product added successfully](https://github.com/user-attachments/assets/7535b96d-1f94-4c3e-bbc8-ca4a966f3815)

![Newly added Product updated in Load Products](https://github.com/user-attachments/assets/ac91c2f4-075e-457f-91f3-1d88edef42c6) 

4.Adjust product prices manually or let the system handle automatic pricing.

![Update Prices Dynamically Based on Stock,Demand and Competitor Price](https://github.com/user-attachments/assets/0f1e1faf-6ff9-491b-8de8-38bf7b5b0dae)

5.Analyze demand and inventory with graphs

![Product Analytics (Stock to Demand Ratio and Average Competitor Price)](https://github.com/user-attachments/assets/0c316b7f-a09a-4835-8147-a618c9878e79)

![Product Demand Forecasting](https://github.com/user-attachments/assets/671876b2-6f80-4a9d-a297-573566d13ae1)

![Visualize Forecasting](https://github.com/user-attachments/assets/10ec446d-4cc3-42b8-936b-250c56e9ee75)



## User Functionalities

1.Login to the User Interface.

![user1 login](https://github.com/user-attachments/assets/b0de6e28-7349-4100-9700-19d3d1836723)

![User Dashboard](https://github.com/user-attachments/assets/0d9244eb-ff4f-4376-92c2-509603f81979)

2.Browse products with dynamically updated prices.

![Search Feature in User Dashboard](https://github.com/user-attachments/assets/3c7dd5b4-6a2c-4fe4-abc6-86ec455f57c8)


3.Add items to the cart and complete purchases.

![Add to Cart Feature ](https://github.com/user-attachments/assets/42e80f91-f299-4d16-b6a9-19be405a5ced)

4.Sort feature 

![Sort by Feature](https://github.com/user-attachments/assets/01042133-dabc-4f36-ad97-759986d1ce97)


## Dynamic Pricing Algorithm
## Factors Considered
Stock Levels:

  1.Low stock increases price to conserve inventory.

  2.High stock decreases price to encourage sales.

Demand Patterns:

   1.High demand leads to price increases.

   2.Low demand reduces prices.

Competitor Pricing:

   1.Matches or undercuts competitor prices when data is available.
## Algorithm Workflow

Formula:

    New Price = (Base Price) ± (Stock Factor) ± (Demand Factor) ± (Competitor Factor)

The forecasting.js script adjusts demand factors weekly based on trends.
## Forecasting Demand

Input: Historical sales data and weeks to forecast.

Output: Demand trends visualized using Chart.js graphs.

![Screenshot 2024-11-18 152842](https://github.com/user-attachments/assets/fdc0cb5b-c46f-4952-9f82-a461ba7086de)

![Product Demand Forecasting](https://github.com/user-attachments/assets/3ca8377c-ed8a-4e73-ae30-989cd4ed1556)

![Visualize Forecasting](https://github.com/user-attachments/assets/2b6ef622-6f57-483b-9ff3-2c3d58aab518)




## API Endpoints

Fetch product details.

    GET /products

Update product prices.

    POST /update-price

Retrieve data for demand forecasting graphs.

    GET /analytics-data
