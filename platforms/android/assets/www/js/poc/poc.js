define([], function(store){
	
    return {
		start: function() {
			console.log("start");
			var dbName = "proof_of_concept2";
			
			var onupgradeneeded = function(e) {
				alert("onupgradeneeded");
				app.db = event.target.result;
				try {
					var objectStore = app.db.createObjectStore("customers", { keyPath: "ssn" });	
					objectStore.createIndex("name", "name", { unique: false });
					objectStore.createIndex("email", "email", { unique: true });
					
					/*var objectStore2 = app.db.createObjectStore("logging",  { autoIncrement : true });
					objectStore2.createIndex("debug", "debug", { unique: false });*/
				}
				catch(e)
				{
					alert("onupgradeneeded error");
					alert(e);
				}
			};
			
			indexedDB.deleteDatabase(dbName);
			
			var request = indexedDB.open(dbName);
			request.onupgradeneeded = onupgradeneeded;
			request.onsuccess = function (e) {
				alert("request.onsuccess");
				try {
					app.db = e.target.result;
					alert("start transaction");
					var transaction = app.db.transaction("customers", "readwrite");
					alert("end transaction");
					var key;
					alert("1");
					var customers = transaction.objectStore("customers");
					alert("2");
					key = customers.add({ ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" });
					key = customers.add({ ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" });
					var transaction2 = app.db.transaction("customers");
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
				}
				catch(e) {
					alert("error");
					require(["dojo/json"], function(json) {
						alert(json.stringify(e));
					});
				}
			}; 
			request.onerror = function(e) { 
				alert ("error request"); 
				require(["dojo/json"], function(json) {
					alert(json.stringify(e));
				});
			} ;
			
			
			
			/*require(["poc/db"], function(db){
				var textObject = "qwerty";
				app.db.insert(textObject);
				
				var result = app.db.retrieve();
				alert("result: " + result);
			});*/
			
		}
    };
});