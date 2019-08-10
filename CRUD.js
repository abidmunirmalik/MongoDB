# CRUD OPERATIONS IN MONGODB

CREATE:
 insertOne(data, options)
 insertMany(data, options)

READ:
 find(filter, options)
 findOne(filter, options)

UPDATE:
 updateOne(filter, data, options)
 updateMany(filter, data, options)
 replaceOne(filter, data, options)

DELETE:
 deleteOne(filter,options)
 deleteMany(filter, options)


# COMPARISON OPERATORS

$eq - Matches values that are equal to a specified value
> db.dob.find({"son" : {$eq : 1} },{"name":1,"hobbies":1})
> db.dob.find({"son" : 1},{"name":1,"hobbies":1})

$gt  - Matches values that are greater than a specified value
$gte - Matches values that are greater than or equal to a specified value
$lt  - Matches values that are less than a specified value
$lte - Matches values that are less than or equal a specified value
> db.dob.find({"son" : {$gt : 1} },{"name":1,"hobbies":1})
> db.dob.find({"son" : {$gte : 1} },{"name":1,"hobbies":1})

$in - Matches any of the values specified in an array
> db.dob.find( {"score":{$in:[50,60]} }, {"name":1,"score":1})
{ "name" : "Umar Abid", "score" : [ 40, 50, 60 ] }

$nin - Matches none of the values specified in an array
> db.dob.find({"score":{$nin:[30]}},{"_id":0,"name":1,"score":1})
{ "name" : "Umar Abid", "score" : [ 40, 50, 60 ] }
> db.dob.find({"score":{$nin:[60]}, "son":{$gt : 2}},{"_id":0,"name":1,"score":1,"son":1})


# ELEMENT OPERATORS
$exists - Matches documents that have the specified field
> db.dob.find({"age": {$exists: true} } ,{"name":1, "age":1})
{"name" : "Umar Abid", "age" : 7 }

$type - Selects documents if a field is of the specified type
>  db.dob.find({"dob": {$type: "date"} } ,{"name":1, "dob":1})
{"name" : "Umar Abid", "dob" : ISODate("2013-08-29T09:00:00Z")}
{"name" : "Ibrahim", "dob" : ISODate("2009-07-11T09:00:00Z")}

# LOGICAL OPERATORS
$and - Join query clauses with a logical AND returns all docs that match both cond
> db.dob.find({ $and:[ {"name":"Umar Abid"},{"hobbies":{$in:["cricket"]}} ] } ,{"name":1, "dob":1,"hobbies":1})

$or - Join query clauses with a logical OR results ANY match
> db.dob.find({ $or:[ {"name":"Awais Abid"},{"hobbies":{$in:["cricket"]}} ]} ,{"name":1, "dob":1,"hobbies":1})

$not - performs a logical NOT operation on the specified operator-expression
> db.dob.find({ "name":{$not:{$in: ["Awais Abid"]}} },{"name":1, "dob":1,"hobbies":1}) 

$nor - performs a logical NOR operation on an array of one or more query expression
> db.dob.find({ $nor: [ {"name":"Awais Abid"},{"hobbies":{$in:["soccor"]} } ]},{"name":1, "dob":1,"hobbies":1})


# ARRAY OPERATOR
$all - Matches arrays that contain all elements specified in the query
> db.dob.find({"hobbies": {$all:["cricket","football"]}} ,{"name":1, "dob":1,"hobbies":1})

$size - operator matches any array with the number of elements specified by argument
> db.dob.find({"score": {$size : 2} })

$elemMatch - operator matches documents that contain ar arry field with at least one element that matches all the specified query criteria
> db.dob.find({"score": {$elemMatch: {$gt:24,$lt:26} } })

$regex - provides regular expression capabilities for pattern matching strings 
> db.dob.find( {"name" : {$regex: /bid$/}  } )
> db.dob.find( {"name" : {$regex: /^A/i}  } )
