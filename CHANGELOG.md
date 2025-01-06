# Change Log
All notable changes to this project will be documented in this file.
 
## [0.1.0] - 2024-10-7
### Added
- Created components and pages with preact
- Implimented basic services

 
## [0.2.0] - 2024-10-16
   
### Added
- Added routing to allow for navigation with a navbar
- Stood up NoSQL database with Back4App
- Added components.js to initialize routing paths
- Added Parse models to query the database
- Added Parse initialization in App.js
### Changed
- Updated preact syntax to react syntax accross all pages
### Fixed
- Fixed the filtering logic on the products page

## [0.3.0] - 2024-11-5
   
### Added
- Login Page for Authentication
- Sign-up Page for Authentication
- Authorization Services
- Protected Routes
### Changed
- Main only shows products if logged in
- Can't access product detail page or seller form routes if not logged in
### Fixed
- fixed the authorization services
- fixed user errors and print statements

## [0.4.0] - 2024-12-14
   
### Added
- User Listings Page for users to see what products they currently have posted and any past products they sold
- Image gallery to display all pictures that were uploaded
- Fuzzy matching autocomplete search on products page
- Deployed via vercel --> https://student-marketplace-mu.vercel.app/
### Changed
- Allow users to upload multiple pictures of their products instead of one when they list an item
### Fixed
- Filtering capability (by price and category) on the products page
- venmo attribute is correctly stored when a product is posted and displayed on the product detail page

## [0.4.1] - 2025-1-6 (not released)
   
### Added
- Allow removing items from favorites
- Products page is sorted by price
- Seller form should populate venmo by default
- Mark as Sold button on listings page
### Changed
- Only sellers can mark their items as unavailable so that randoms can't remove items from view without paying
- Buy button changed to give alert to contact seller
### Fixed
- Login no longer requires both email and password
- Registration requires venmo and checks that email ends in .edu and that password matches password-confirm
- Search bar matches case and is less fuzzy
- Filter by seller displays seller emails rather than seller ids
