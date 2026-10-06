# library-management-system

THIS IS A LIBRARY MANAGEMENT API BACKEND FOR THE MANAGEMENT OF USERS AND BOOKS
# routes and end pints

# # /users
GET: get all the list of user in the system
POST:Create new user

## /user{id} 
GET:get user by their id
PUT:updating a user by their id
DELETE:Delete a user by their id(check if the user still has an issued book)&&(is there is any fine to be collected)

## /user/subscription-detail/{id}
GET: get a user subscriptyion details by their id
>>date of sub.
>>Valid till?
>>Fine if any?

## /books
GET: get all the books in the system
POST: ADd a new book to the system

## /book{id}
GET: GET a book by id
PUT:update a bookby its id
DELETE:DElete a book by its id

## /books/issued
GET:get all issued books

## /books/issued/withFine
GET: get all issued book with their fine amount

## subscription types
>>basic
>>standard
>>premium

>> if a user misses a renewal date, then user should be collected with $100
>> if a user misses subscription, then user is expexted to pay $100
>> if a user misses  both , then the collected amount should be $200

# COmmand
>>npm init
>>npm i express
>>npm i nodemon --save-dev //only for developer