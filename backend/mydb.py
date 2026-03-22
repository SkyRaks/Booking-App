import psycopg

conn = psycopg.connect(
    dbname = 'postgres',
    user = 'postgres',
    password = 'password',
    host = 'localhost',
    port = 5432
)

conn.autocommit = True
cur = conn.cursor()

cur.execute("CREATE DATABASE bookingdb;")

print("DB created!")
cur.close()
conn.close()
# DON'T USE
