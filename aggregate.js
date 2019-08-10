> use bookstore
switched to db bookstore

> db.authorsData.insertMany([{"name":"Darl Kuhn","country":"USA","state":"CO"},{"name":"Abid Malik","country":"USA","state":"NC"}])
{
	"acknowledged" : true,
	"insertedIds" : [
		ObjectId("5d4e8e7b401bbff9bd8f1f53"),
		ObjectId("5d4e8e7b401bbff9bd8f1f54")
	]
}


> db.booksData.insertMany([{"title":"Oracle 10g for Linux Admins","isbn":"119802345","author":ObjectId("5d4e8e7b401bbff9bd8f1f53")},{"title":"Expert MySQL Replication","isbn":"2345678","author":ObjectId("5d4e8e7b401bbff9bd8f1f54")}])
{
	"acknowledged" : true,
	"insertedIds" : [
		ObjectId("5d4e8f39401bbff9bd8f1f55"),
		ObjectId("5d4e8f39401bbff9bd8f1f56")
	]
}


> db.booksData.aggregate([{ $lookup: {from: "authorsData",localField:"author",foreignField:"_id",as : "Authors"}  }]).pretty()
{
	"_id" : ObjectId("5d4e8f39401bbff9bd8f1f55"),
	"title" : "Oracle 10g for Linux Admins",
	"isbn" : "119802345",
	"author" : ObjectId("5d4e8e7b401bbff9bd8f1f53"),
	"Authors" : [
		{
			"_id" : ObjectId("5d4e8e7b401bbff9bd8f1f53"),
			"name" : "Darl Kuhn",
			"country" : "USA",
			"state" : "CO"
		}
	]
}
{
	"_id" : ObjectId("5d4e8f39401bbff9bd8f1f56"),
	"title" : "Expert MySQL Replication",
	"isbn" : "2345678",
	"author" : ObjectId("5d4e8e7b401bbff9bd8f1f54"),
	"Authors" : [
		{
			"_id" : ObjectId("5d4e8e7b401bbff9bd8f1f54"),
			"name" : "Abid Malik",
			"country" : "USA",
			"state" : "NC"
		}
	]
}
