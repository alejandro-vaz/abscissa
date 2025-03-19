import os
import json
import mysql.connector
import subprocess

# Data to be inserted
table_name = 'problems'

try:
    # Establish the connection
    db_connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="SKIP",
        database="data"
    )

    # Create a cursor object
    cursor = db_connection.cursor()

    # Change the database collation to iso-8859-15
    alter_database_query = "ALTER DATABASE data CHARACTER SET latin1 COLLATE latin1_general_ci;"
    cursor.execute(alter_database_query)
    print("Database collation changed to iso-8859-15.")

    # Change the table collation to iso-8859-15
    alter_table_query = f"ALTER TABLE {table_name} CONVERT TO CHARACTER SET latin1 COLLATE latin1_general_ci;"
    cursor.execute(alter_table_query)
    print(f"Table '{table_name}' collation changed to iso-8859-15.")

    # Clear all data in the table
    delete_query = f"DELETE FROM {table_name};"
    cursor.execute(delete_query)
    db_connection.commit()
    print(f"All data in the table '{table_name}' has been deleted.")

    # Directory containing JSON files
    directory = 'problems/'

    # Iterate over all JSON files in the directory
    for filename in os.listdir(directory):
        if filename.endswith('.json'):
            file_path = os.path.join(directory, filename)
            
            # Read the content of the JSON file
            with open(file_path, 'r', encoding='utf-8') as file:
                content = json.load(file)
            
            # Assign values
            column1_value = filename.split(".")[0]
            column2_value = json.dumps(content)
            
            # Define the SQL INSERT statement using parameterized query
            sql_insert_query = f"""
            INSERT INTO {table_name} (id, data)
            VALUES (%s, %s);
            """
            
            # Execute the INSERT statement
            cursor.execute(sql_insert_query, (column1_value, column2_value))

    # Commit the transaction
    db_connection.commit()

    print(f"{cursor.rowcount} record(s) inserted successfully.")

    # Export the database to a .sql file
    export_command = [
        "mysqldump",
        "-h", "localhost",
        "-u", "root",
        "-pSKIP",
        "data"
    ]
    with open("data.sql", "w") as output_file:
        subprocess.run(export_command, stdout=output_file, check=True)
    print("Database exported successfully to 'data.sql'.")

except mysql.connector.Error as err:
    print(f"Error: {err}")

except subprocess.CalledProcessError as err:
    print(f"Error during database export: {err}")

finally:
    # Close the cursor and connection
    if cursor:
        cursor.close()
    if db_connection:
        db_connection.close()
