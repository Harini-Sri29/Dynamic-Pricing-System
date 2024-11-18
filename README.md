
## Dynamic Pricing System

The Dynamic Pricing System is a web-based application that adjusts product prices dynamically based on stock levels, demand, and competitor pricing. The system provides real-time insights into price changes and enables administrators to view and manually adjust prices. Users can interact with the system to browse products and view the latest dynamically calculated prices.

## Problem Statement
Modern e-commerce businesses face challenges in pricing products dynamically based on stock, demand, and competitors. Static pricing models fail to optimize revenue and customer satisfaction.


## Objective
The Dynamic Pricing System automates price adjustments to maximize profit while staying competitive. Admins have full control over analytics, while users experience fair pricing based on real-time market conditions.

## Features
1.Admin Panel

 1.View product pricing, stock, and demand trends.
 2.Adjust prices manually or rely on automated algorithms.
 3.Access analytics and demand forecasting graphs.

2.User Interface
    
 1.Explore products with real-time pricing.
 2.Add products to the cart and make purchases.

Dynamic Pricing

Prices adjust automatically based on:
    
 1.Stock levels.
 2.Demand patterns   
 3.Competitor pricing.

Forecasting and Analytics

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
![Dynamic Pricing DB](https://github.com/user-attachments/assets/d799cdc3-52ab-4397-8ae3-f5113b04e5ae)
3.Create two collections:
 
    products (fields: name, price, stock, demand).   
    users (fields: username, password).
4.Insert sample data into the collections.

## Run the Application
Start the server:

    node server.js

Open the application in your browser:

http://localhost:5000

## Usage
## Admin Functionalities

1.Login to the Admin Panel.
2.View product list with price, stock, and demand.
3.Adjust product prices manually or let the system handle automatic pricing.
4.Analyze demand and inventory with graphs

## User Functionalities

1.Login to the User Interface.
2.Browse products with dynamically updated prices.
3.Add items to the cart and complete purchases.

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

## API Endpoints

 Fetch product details
    GET /products
 
 Update product prices    
    POST /update-price
    
 Retrieve data for demand forecasting graphs    
    GET /analytics-data
