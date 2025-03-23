# IMPORT COMMON MODULES
import os
import json
import subprocess

# IMPORT THIRD-PARTY MODULES
import mysql.connector

# FINISH IMPORTS
print("Modules imported.")

# CONNECT TO DATABASE
try:
    db_connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="SKIP",
        database="data"
    )
    table_name = "problems"
    directory = f"{table_name}/"
    print("Connection established.")
except:
    print("Connection failed.")
    exit(1)

# CONNECT TO TERMINAL
cursor = db_connection.cursor()
# USE GENERAL CHARACTER SETS
cursor.execute("ALTER DATABASE data CHARACTER SET latin1 COLLATE latin1_general_ci;")
cursor.execute(f"ALTER TABLE {table_name} CONVERT TO CHARACTER SET latin1 COLLATE latin1_general_ci;")
# CLEAR ALL DATA FROM TABLE
delete_query = f"DELETE FROM {table_name};"
cursor.execute(delete_query)
# APPLY CHANGES
db_connection.commit()
# ADD DATA
counter = 0
for filename in os.listdir(directory):
    if filename.endswith('.json'):
        counter += 1
        # GET FILE PATH
        file_path = os.path.join(directory, filename)
        # READ CONTENT
        with open(file_path, 'r', encoding='utf-8') as file:
            content = json.load(file)
        # ASSIGN COLUMN VALUES
        column1_value = filename.split(".")[0]
        column2_value = json.dumps(content)
        # DEFINE INSERT QUERY
        sql_insert_query = f"""
        INSERT INTO {table_name} (id, data)
        VALUES (%s, %s);
        """
        # INSERT
        cursor.execute(sql_insert_query, (column1_value, column2_value))
# APPLY CHANGES
db_connection.commit()
print(f"{counter} record{"s" if counter > 1 else ""} ha{"ve" if counter > 1 else "s"} been inserted.")
# EXPORT DATABASE TO FILE
export_command = [
    "mysqldump",
    "-h", "localhost",
    "-u", "root",
    "-pSKIP",
    "data"
]
# RUN EXPORT
with open("data/data.sql", "w") as output_file:
    subprocess.run(export_command, stdout=output_file, check=True)
cursor.close()
db_connection.close()
print("Done.")