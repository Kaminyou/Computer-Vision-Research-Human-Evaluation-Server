import sqlite3

if __name__ == "__main__":
    conn = sqlite3.connect('evaluation.db')
    print ("Open DB")
    c = conn.cursor()
    c.execute('''CREATE TABLE EVALUATION
        (ID CHAR(37) PRIMARY KEY  NOT NULL,
        SUBMISSION_DATE TIMESTAMP NOT NULL,
        ACCOUNT         TEXT  NOT NULL,
        TASK            TEXT  NOT NULL,
        CHALLENGE_ID     TEXT  NOT NULL,
        AVAILABLE_CHOICES TEXT  NOT NULL,
        CHOICES         TEXT  NOT NULL,
        DURATION INT NOT NULL);''')
    print("CREATE DB")
    conn.commit()
    conn.close()
