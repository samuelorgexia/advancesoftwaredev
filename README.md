# Auctionify 
This web application is an online auction site for real estate that users can sell and bid in real time on properties that are up for auction.

# Features
- Samuel Li - User accounts and authorisation 
- Lucas Hahn - Properities listing and maps
- Ul Ly - Property details and live chat
- John McCreanor - User Admin and Property Creation
- Steven Li - Auction and Search

# Repository Structure 
## Backend 
- Samuel Li - jwt,BudgetVerify,db,dbconfig,user,app,user#test,middleware
- Lucas Hahn - properties.test,routes,Properties.js,app
- Steven Li - handlers,bidHandler.test
- Ul Ly - connection.test,index

## Frontend
- Samuel Li - routes,users 
- Lucas Hahn - components,layouts,services,OtherListings,Property,PropertyDetails,PropertyListings,tailwind.config,tailwindcss-config
- Ul Ly - PropertyDetails,LiveChat
- John McCreanor - admin
- Steven Li - BidDisplay,SearchBarAuthService,Auction

# How to install

Mother of all installers
- run "npm run install-all"

Individual install scripts
1. run "npm install" (root package, mainly for concurrently package).
2. run "npm run backend-install" (backend node)
3. run "npm run frontend-install" (frontend react)

# How to run

## Run everything at once!

"npm run dev"

## Run only backend

"npm run backend"

## Run only frontnend

"npm run frontend"
