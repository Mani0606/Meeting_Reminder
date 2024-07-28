import * as SQLite from "expo-sqlite";
import { Meeting } from "./MeetingDetails";
// Open or create the database
const db = SQLite.openDatabase("Project2.db");

// Function to create the Meetings table if it doesn't exist
export function createMeetingsTable() {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Meetings (
                id INTEGER PRIMARY KEY,
                MeetingName TEXT NOT NULL,
                ROOM_NO REAL NOT NULL,
                Link TEXT,
                Date TEXT NOT NULL,
                Time TEXT NOT NULL,
                Mode TEXT NOT NULL
            )`,
            [],
            () => {
                console.log("Meetings table created successfully");
            },
            error => {
                console.log("Error creating Meetings table:", error);
            }
        );
    });
}

// Check if the Meetings table exists
db.transaction(tx => {
    tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Meetings'",
        [],
        (_, result) => {
            if (result.rows.length === 0) {
                // If the table doesn't exist, create it
                createMeetingsTable();
            } else {
                console.log("Meetings table already exists");
            }
        },
        (_, error) => {
            console.error("Error checking for Meetings table:", error);
        }
    );
});

// Function to insert data into the Meetings table for offline meetings
export function insertOfflineMeeting(MeetingName, Room_No, Date, Time, Mode) {
    console.log("Inserting offline meeting:", MeetingName, Room_No, Date, Time, Mode);
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Meetings (MeetingName, Room_No, Date, Time, Mode) VALUES (?, ?, ?, ?, ?)",
            [MeetingName, Room_No, Date, Time, Mode],
            () => {
                console.log("Offline meeting data inserted successfully");
            },
            error => {
                console.log("Error inserting offline meeting data:", error);
            }
        );
    });
}

// Function to insert data into the Meetings table for online meetings
export function insertOnlineMeeting(MeetingName, Link, Date, Time, Mode) {
    console.log("Inserting online meeting:", MeetingName, Link, Date, Time, Mode);
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Meetings (MeetingName, Link, Date, Time, Mode) VALUES (?, ?, ?, ?, ?)",
            [MeetingName, Link, Date, Time, Mode],
            () => {
                console.log("Online meeting data inserted successfully");
            },
            error => {
                console.log("Error inserting online meeting data:", error);
            }
        );
    });
}

// Function to select and retrieve data from the Meetings table
export function selectMeetings() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Meetings",
                [],
                (_, result) => {
                    const rows = result.rows;
                    const data = [];
                    for (const dp of rows._array) {
                        data.push(new Meeting(dp.MeetingName, dp.Room_no, dp.Link, dp.Date, dp.Time, dp.Mode, dp.id));
                        // console.log(dp.id)
                    }
                    console.log("Meetings data retrieved successfully");
                    resolve({ success: true, data }); // Resolve with the fetched data and success status
                },
                error => {
                    console.log("Error fetching Meetings data:", error);
                    reject({ success: false, error }); // Reject the promise with error information
                }
            );
        },
            error => {
                console.error("Transaction error:", error);
                reject({ success: false, error }); // Reject the promise with transaction error information
            });
    });
}

export function WhereMeetings(condition) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Meetings WHERE DATE = (?)",
                [condition],
                (_, result) => {
                    const rows = result.rows;
                    const data = [];
                    for (let i = 0; i < rows.length; i++) {
                        data.push(rows.item(i));
                    }
                    console.log("Where data retrieved successfully");
                    resolve({ success: true, data }); // Resolve with the fetched data and success status
                },
                error => {
                    console.log("Error fetching Where data:", error);
                    reject({ success: false, error }); // Reject the promise with error information
                }
            );
        },
            error => {
                console.error("Transaction error:", error);
                reject({ success: false, error }); // Reject the promise with transaction error information
            });
    });
}

export function deleteRowById(id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql(
                    `DELETE FROM Meetings WHERE id = ?`,
                    [id],
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            },
            error => console.error('Transaction error:', error)
        );
    });
};