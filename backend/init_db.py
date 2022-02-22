import sqlite3

if __name__ == "__main__":
    conn = sqlite3.connect('evaluation.db')
    print ("Open DB")
    c = conn.cursor()
    c.execute('''CREATE TABLE EVALUATION
        (ID CHAR(37) PRIMARY KEY  NOT NULL,
        ACCOUNT        TEXT  NOT NULL,
        TASK           TEXT  NOT NULL,
        CHALLENGEID    TEXT  NOT NULL,
        CHOICE         TEXT  NOT NULL);''')
    print("CREATE DB")
    conn.commit()
    conn.close()
