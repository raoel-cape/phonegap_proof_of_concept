define(["dojo/_base/declare"], function(declare){
	var db;
	var dbName = "proof_of_concept";
	var version = 1;
	var onupgradeneeded = function(e) {
		db = event.target.result;

		var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });	
		objectStore.createIndex("name", "name", { unique: false });
		objectStore.createIndex("email", "email", { unique: true });
		
		var objectStore2 = db.createObjectStore("logging",  { autoIncrement : true });
		objectStore2.createIndex("debug", "debug", { unique: false });
	};
	var onsuccess = function(e)
	{
		alert("open");
		db = e.target.result;
	}
	// set up database
	var openDatabase =  function() 
	{
		var request = indexedDB.open(dbName, version);
		request.onupgradeneeded = onupgradeneeded;
		request.onsuccess = onsuccess;
		request.onerror = function() { alert("error opening database"); } ;
	};
	
	openDatabase();
	while(!db)
	{
		
	}
	return {
		
		insert: function(data)
		{
			
			
			var transaction = db.transaction(["customers", "strings"], "readwrite");
			var customers = transaction.objectStore("customers");
			var logging = transaction.objectStore("logging");
			var key;
			key = customers.add({ ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" });
			logging({debug: key});
			key = customers.add({ ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" });
			logging({debug: key});
			
			
			logging.add({debug: data});
		},
		retrieve: function() {
			var request = indexedDB.open(this.dbName, this.version);
			request.onupgradeneeded = this.createDatabase;
			
			var transaction = db.transaction(["customers", "logging"]);
			var objectStore = transaction.objectStore("customers");
			var objectStore2 = transaction.objectStore("logging");
			var request = objectStore.get("444-44-4444");
			
			return request.result.name;
		}
	}
});