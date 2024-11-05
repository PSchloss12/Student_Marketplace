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
