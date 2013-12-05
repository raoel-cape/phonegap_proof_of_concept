/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
			var x = document.createElement("script");
		x.src = "js/lib/IndexedDBShim.min.js";
		x.onload = function(){
			window.setTimeout(app.start, 2000);
		};
		document.body.appendChild(x);
		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	start: function() {
	
				
		require(["poc/poc"  ], function(poc){
			if (typeof window.mozIndexedDB !== "undefined") {
				window.indexedDB = window.mozIndexedDB;
			}
			else {
				window.indexedDB = window.shimIndexedDB;
				window.shimIndexedDB.__useShim();
				window.shimIndexedDB.__debug(true);
			}
			alert("here");
			poc.start();
			
			
			
		} );
	},
	startagain: function(db) {
		
		
		app.start2();
	},
	start2: function() {
	// open a read/write db transaction, ready for adding the data
      var transaction = db.transaction(["toDoList"], "readwrite");
	  // create an object store on the transaction
      var objectStore = transaction.objectStore("toDoList");
      
	  // grab the values entered into the form fields and store them in an object ready for being inserted into the IDB
      var newItem = [
        { taskTitle: "titel", hours: 3, minutes: 10, day: "ja", month: 5, year: 2013, notified: "no" },
		{ taskTitle: "titel2", hours: 6, minutes: 10, day: "ja", month: 5, year: 2013, notified: "no" }

      ];
	  
	  // add our newItem object to the object store
      var request = objectStore.add(newItem[0]);        
	  
      request.onsuccess  = app.start3;
	  request.onerror = app.start3;
	
	},
	start3: function(e) {
		var objectStore = db.transaction('toDoList').objectStore('toDoList');
		objectStore.openCursor().onsuccess = app.start4;
		
	},
	start4: function(e) {
		var cursor = e.target.result ;
		if(cursor) {			
			alert(cursor.value.taskTitle);
			cursor.continue();
		}
	}
	

};
