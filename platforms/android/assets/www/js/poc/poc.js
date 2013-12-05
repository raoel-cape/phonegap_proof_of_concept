define([], function (store) {

    return {
        start: function () {
            // Let us open our database
            var request = window.indexedDB.open("toDoList", 4);

            // these two event handlers act on the IDBDatabase object, when the database is opened successfully, or not
            request.onerror = function (event) {
                alert('<li>Error loading database.</li>');
				require(["dojo/json"], function(JSON){
				  alert(JSON.stringify(event));
				});
            };

            request.onsuccess = function (event) {
                alert('<li>Database initialised.</li>');

                // store the result of opening the database in the db variable. This is used a lot later on
                db = request.result;

                // Run the displayData() function to populate the task list with all the to-do list data already in the IDB
                app.startagain(db);
            };

            // This event handles the event whereby a new version of the database needs to be created
            // Either one has not been created before, or a new version number has been submitted via the
            // window.indexedDB.open line above

            request.onupgradeneeded = function (event) {
                var db = event.target.result;

                db.onerror = function (event) {
                    note.innerHTML += '<li>Error loading database.</li>';
                };

                // Create an objectStore for this database using IDBDatabase.createObjectStore

                var objectStore = db.createObjectStore("toDoList", {
                    keyPath: "taskTitle"
                });

                // define what data items the objectStore will contain

                objectStore.createIndex("hours", "hours", {
                    unique: false
                });
                objectStore.createIndex("minutes", "minutes", {
                    unique: false
                });
                objectStore.createIndex("day", "day", {
                    unique: false
                });
                objectStore.createIndex("month", "month", {
                    unique: false
                });
                objectStore.createIndex("year", "year", {
                    unique: false
                });

                objectStore.createIndex("notified", "notified", {
                    unique: false
                });

                alert('<li>Object store created.</li>');
            };

        }
    };
});