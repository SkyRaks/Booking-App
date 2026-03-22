import psycopg

DB_CONFIG = {
    "host": "localhost",
    "dbname": "postgres",
    "user": "postgres",
    "password": "password",
    "port": 5432,
}

def get_connection():
    return psycopg.connect(
        host=DB_CONFIG["host"],
        dbname=DB_CONFIG["dbname"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
        port=DB_CONFIG["port"],
    )
