define([], function(store){
    return {
		start: function() {
			console.log("start");
			
			var onupgradeneeded = function(e) {
				console.log("onupgradeneeded");
				db = event.target.result;

				var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });	
				objectStore.createIndex("name", "name", { unique: false });
				objectStore.createIndex("email", "email", { unique: true });
				
				var objectStore2 = db.createObjectStore("logging",  { autoIncrement : true });
				objectStore2.createIndex("debug", "debug", { unique: false });
			};
			
			
			
			var request = indexedDB.open("proof_of_concept2");
			request.onupgradeneeded = onupgradeneeded;
			request.onsuccess = function (e) {
				console.log("request.onsuccess");
				var db = e.target.result;
				var transaction = db.transaction("customers", "readwrite");
				var key;
				var customers = transaction.objectStore("customers");
				key = customers.add({ ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" });
				key = customers.add({ ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" });
				var transaction2 = db.transaction("customers");
				transaction2.objectStore("customers").openCursor().onsuccess = function(e) {
					console.log("openCursor");
					 var cursor = e.target.result;
					 var results = [];
					 if (cursor) {
						  results.push(cursor.value) 
						  cursor.continue();
					 };
					 for(var i = 0, len = results.length; i<len; i++)
					 {
						var result = results[i];
						alert(result.ssn);
					 }
				};
			}; 
			
			
			
			/*require(["poc/db"], function(db){
				var textObject = "qwerty";
				db.insert(textObject);
				
				var result = db.retrieve();
				alert("result: " + result);
			});*/
			
		}
    };
});