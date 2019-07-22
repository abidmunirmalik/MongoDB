// print each mongo database information

var dblist = db.getMongo().getDBNames();

for(i=0; i<dblist.length; i++){
  var db = db.getSiblingDB(dblist[i]);
  var datasize  = db.stats(1024).dataSize;
  var indexsize = db.stats(1024).indexSize;
  print("");
  print("Database: "+db+ " (size: "+Math.round( (datasize + indexsize)/1024 )+" MB)");
  var ns = db.getCollectionNames();
    for(j=0; j<ns.length; j++){
      print("collection: "+ns[j]+ " (documents count: "+db.getCollection(ns[j]).count()+")");
    }
  print("");
}

// call script: mongo -u <mongo_user> admin -p --host <host_name> --quiet mongo_dbs_info.js
