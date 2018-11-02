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

    `DROP TABLE visits;`,

    `DROP TABLE subscribers_projects;`,

    `DROP TABLE purchases_projects;`,

    `DROP TABLE purchases;`,

    `DROP TABLE subscribers;`,

    `DROP TABLE company_contacts;`,

    `DROP TABLE projects;`,

    `DROP TABLE enterpreneurs;`,

    `DROP TABLE project_statuses;`,

    `DROP TABLE investors;`,

    `DROP TABLE purchase_statuses;`,

    `DROP TABLE content;`,

    `DROP TABLE contact_us_mail;`,

    `DROP TABLE our_team;`,

    `DROP TABLE admins;`,

    `DROP TABLE trusted_by;`,

    `DROP TABLE branches;`,

    `DROP TABLE banks;`,
]


tables.forEach((item, i) => {
    let query = item
    postgresClient.query(query, (err) => {
        if (err) {
            console.log(`An error has been occured while deleting table ${i} - ${err}`)
        } else {
            console.log(`Table ${i} succesfully deleted`)
        }
    })
})
