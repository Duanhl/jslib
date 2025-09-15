

export const InitShtSQL = `
CREATE TABLE sht_form IF NOT EXISTS  (
    thread_id INTEGER PRIMARY KEY,
    form INTEGER,
    title TEXT,
    url TEXT,
    publish_date TEXT,
    sn TEXT,
    ftype TEXT,
    magnet TEXT,
    img TEXT
)
`