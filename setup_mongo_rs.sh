#!/bin/bash

# script will setup a 3-node replica set

function stop_running_mongod(){
 sudo bash -c "killall mongod; true"
}

function uninstall_prior_installation(){
 VERSION=4.0.6-3
 sudo yum -y remove percona-server-mongodb-{server,tools,shell}-${VERSION}.el7
}

function setup_repo_and_mongod(){
 sudo yum -y install https://repo.percona.com/yum/percona-release-latest.noarch.rpm
 sudo percona-release enable psmdb-40 release
 VERSION=4.0.6-3
 sudo yum -y install percona-server-mongodb-{server,tools,shell}-${VERSION}.el7
}

function create_dir(){
 sudo rm -Rf /data
 sudo mkdir -p /data/db/rs/{1,2,3}
 sudo chown -R mongod:mongod /data/
}

function start_mongod(){
 sudo mongod -f ./rs1.conf
 sudo mongod -f ./rs2.conf
 sudo mongod -f ./rs3.conf
}

function initiate_rs(){
 mongo --eval 'rs.initiate()'
}

function add_nodes(){
 mongo --eval "rs.add('$(hostname):27027');rs.add('$(hostname):27037')"
 mongo --eval 'rs.status()'
}

stop_running_mongod
uninstall_prior_installation
setup_repo_and_mongod
create_dir
start_mongod
initiate_rs
add_nodes
echo "DONE"
exit 0
