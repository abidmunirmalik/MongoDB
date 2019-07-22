// print replica set configuration

var conf = rs.config()
var j = conf["members"].length

print("");
print("Replica Set: "+conf._id);
for (i=0; i<j; i++){
print("_id:" +i+ ", name:" +conf["members"][i].host + ", hidden:" +conf["members"][i].hidden + ", arbiterOnly:" +conf["members"][i].arbiterOnly+", priority:"+conf["members"][i].priority+", votes:"+conf["members"][i].votes);
}

// Replica Set Status info
var stat = rs.status()
print("");
print("Replica Set Role: "+stat.set);
for (i=0; i<j; i++){
print("_id:" +i+ ", name:" +stat["members"][i].name + ", role:" +stat["members"][i].stateStr);
}
print("");

// call script: mongo -u <mongo_user> admin -p --host <host_name> --quiet replica_set_info.js
