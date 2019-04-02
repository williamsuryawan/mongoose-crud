# mongoose-crud
# Created by William Suryawan

## Base URL
### Server: http://localhost:3000


## Member Routing

Routing | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/members|GET|token:**Not Required**||Error:<br>Internal server error<br>Success:<br>show the member list|view all members
/members|POST|token:**Not Required**|name:String(**Required**)<br>address:String(**Required**) zipcode:String(**Required**) email:String(**Required**) phone:String(**Required**) |Error:<br>Internal server error <br>Success:<br>success add member to the database| add member to database
/members/:id|PUT|token:**Not Required** <br> memberId:String(**Required**)||Error:<br>Internal server error <br>Success:<br>edit member success| edit member in database
/members/:id|DELETE|token:**Not Required** <br> memberId:String(**Required**)||Error:<br>Internal server error <br>Success:<br>delete member success| delete member from database


## Book Routing

Routing | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/books|GET|token:**Not Required**||Error:<br>Internal server error<br>Success:<br>show the book list|view all available books
/books|POST|token:**Not Required**|isbn:String(**Required**)<br>title:String(**Required**) author:String(**Required**) category:String(**Required**) stock:Number(**Required**) |Error:<br>Internal server error <br>Success:<br>success add book to the database| add books to database
/books/:id|PUT|token:**Not Required** <br> bookId:String(**Required**)| |Error:<br>Internal server error <br>Success:<br>edit books success| edit book in database
/books/:id|DELETE|token:**Not Required** <br> bookId:String(**Required**)||Error:<br>Internal server error <br>Success:<br>delete book success| delete book from database


## Transactions Routing

Routing | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/transactions|GET|token:**Not Required**||Error:<br>Internal server error<br>Success:<br>show the transactions list|view all transactions list
/transactions|POST|token:**Not Required**|member:memberId(**Required**)<br>due_date:YYYY-MM-DD(**Required**) booklist:bookId(**Required**)|Error:<br>Internal server error <br>Success:<br>success new transaction to the database| add new transaction to database (book is going out from library)
/transactions/:id|PUT|token:**Not Required** <br> transactionId:String(**Required**)|in_date:YYYY-MM-DD(**Required**)|Error:<br>Internal server error <br>Success:<br>edit the transactions | send back the book to the library and show the 'fine' if 'in_date' is later than 'due_date'
/transactions/:id|DELETE|token:**Not Required** <br> transactionId:String(**Required**)||Error:<br>Internal server error <br>Success:<br>delete book success| delete transaction from database