const {Client} = require('pg')
const keys = require('./keys')

//connecting to postgres
const postgresClient = new Client({
    host: keys.postgres.host,
    port: keys.postgres.port,
    user: keys.postgres.user,
    password: keys.postgres.password,
    database: keys.postgres.database
})

postgresClient.connect((err)=>{
    err ? console.log(`Postgres connection error: ${err}`) :
        console.log('Postgres connected!')
})

const tables = [

    `ALTER TABLE purchases 
        ADD FOREIGN KEY (status_id) REFERENCES purchase_statuses(id);
    `,

    `ALTER TABLE visits     
        ADD FOREIGN KEY (project_id) REFERENCES projects(id)ON DELETE CASCADE;
    `,

    `ALTER TABLE investors     
        ADD FOREIGN KEY (bank_id) REFERENCES banks(id)ON UPDATE CASCADE;
    `,

    `ALTER TABLE purchases     
        ADD FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        ADD FOREIGN KEY (investor_id) REFERENCES investors(id) ON DELETE CASCADE;
    `,

    `ALTER TABLE subscribers     
        ADD FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        ADD FOREIGN KEY (investor_id) REFERENCES investors(id) ON DELETE CASCADE;
    `,

    `ALTER TABLE subscribers_projects     
        ADD FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        ADD FOREIGN KEY (investor_id) REFERENCES investors(id) ON DELETE CASCADE;
    `,

    `ALTER TABLE purchases_projects     
        ADD FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        ADD FOREIGN KEY (investor_id) REFERENCES investors(id) ON UPDATE CASCADE;
    `,
    `ALTER TABLE projects 
        ADD FOREIGN KEY (status_id) REFERENCES project_statuses(id),
        ADD FOREIGN KEY (enterpreneur_id) REFERENCES enterpreneurs(id);
    `,
    `ALTER TABLE branches 
        ADD FOREIGN KEY (bank_code) REFERENCES banks(id);
    `
]

tables.forEach((item, i)=>{
    let query = item
    postgresClient.query(query, (err)=>{
        if(err) {
            console.log(`An error has been occured while creating table ${i} - ${err}`)
        } else {
            console.log(`Table ${i} succesfully altered`)
        }
    })
})

