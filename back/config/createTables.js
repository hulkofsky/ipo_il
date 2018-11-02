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
    `CREATE TABLE IF NOT EXISTS project_statuses(
        id SERIAL PRIMARY KEY,
        status_name TEXT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS projects(
        id BIGSERIAL PRIMARY KEY,
        enterpreneur_id INT NOT NULL,
        project_name TEXT NOT NULL,
        project_field TEXT NOT NULL,
        money_to_collect REAL NOT NULL,
        money_collected REAL NOT NULL,
        project_start_date TIMESTAMP NOT NULL,
        project_finish_date TIMESTAMP NOT NULL,
        video_url TEXT NOT NULL,     
        project_description TEXT NOT NULL,
        tashkif_file TEXT NOT NULL,
        project_files TEXT[],
        archive_name TEXT,
        company_link TEXT,
        
        project_team JSON[],
        articles JSON[],
        
        status_id INT NOT NULL, 
        
        is_talking_about_us BOOLEAN NOT NULL,
        learn_more BOOLEAN NOT NULL,
        
        unit_name1 TEXT,
        unit_name2 TEXT,
        unit_name3 TEXT,
        min_total_price1 REAL,
        max_total_price1 REAL,
        min_units1 INT,
        min_total_price2 REAL,
        max_total_price2 REAL,
        min_units2 INT,
        min_total_price3 REAL,
        max_total_price3 REAL,
        min_units3 INT,
        project_type TEXT NOT NULL
    );
    
    CREATE INDEX ent_id ON projects (enterpreneur_id);
    `,

    `CREATE TABLE IF NOT EXISTS enterpreneurs(
        id SERIAL PRIMARY KEY,
        
        company_name TEXT NOT NULL,
        vat_number TEXT NOT NULL,
        ceo_name TEXT NOT NULL,
        country_of_registration TEXT NOT NULL,
        company_email TEXT NOT NULL,
        company_phone TEXT NOT NULL,
        funding_sum INT NOT NULL,
        last_year_sales INT NOT NULL,
        password TEXT NOT NULL,
        video_url TEXT,
        
        company_presentation TEXT,
        financial_report TEXT,
        archive_name TEXT,
        
        signin_token TEXT,
        reset_pass_token TEXT,
        reset_pass_expires BIGINT,
        
        email_conf BOOLEAN NOT NULL,
        phone_conf BOOLEAN NOT NULL,
        
        project_eval_notification BOOLEAN NOT NULL,
        project_running_notification BOOLEAN NOT NULL,
        project_subscription_notification BOOLEAN NOT NULL,
        project_purchases_notification BOOLEAN NOT NULL,
        project_deleted_notification BOOLEAN NOT NULL,
        project_edited_notification BOOLEAN NOT NULL,
        project_days_left_notification BOOLEAN NOT NULL,
        
        team_members JSON[]
    );
    CREATE INDEX ent_token ON enterpreneurs (signin_token);
    CREATE INDEX comp_email ON enterpreneurs (company_email);
    `,

    `CREATE TABLE IF NOT EXISTS investors(
        id BIGSERIAL PRIMARY KEY,
        
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        bank_id INT NOT NULL,
        branch_code INT NOT NULL,
        password TEXT NOT NULL,
        account_number TEXT NOT NULL,
       
        email_conf BOOLEAN NOT NULL,
        phone_conf BOOLEAN NOT NULL,
        
        signin_token TEXT,
        reset_pass_token TEXT,
        reset_pass_expires BIGINT,
        
        project_running_notification BOOLEAN NOT NULL,
        project_subscription_notification BOOLEAN NOT NULL,
        project_purchases_notification BOOLEAN NOT NULL,
        project_deleted_notification BOOLEAN NOT NULL,
        project_edited_notification BOOLEAN NOT NULL,
        project_days_left_notification BOOLEAN NOT NULL
    );
    CREATE INDEX inv_email ON investors (email);
    CREATE INDEX inv_token ON investors (signin_token);
    CREATE INDEX inv_reset_pass_token ON investors (reset_pass_token);
    CREATE INDEX inv_reset_pass_expires ON investors (reset_pass_expires);
    `,

    `CREATE TABLE IF NOT EXISTS visits(
        id BIGSERIAL PRIMARY KEY,
        project_id INT NOT NULL,
        visit_date TIMESTAMP NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS purchases(
        id BIGSERIAL PRIMARY KEY,
        investor_id INT NOT NULL,
        project_id INT NOT NULL,
        purchase_date TIMESTAMP NOT NULL,
        status_id INT NOT NULL,
        unit_count INT,
        unit_price REAL,
        po_doc TEXT
    );`,

    `CREATE TABLE IF NOT EXISTS company_contacts(
        id serial,
        contact TEXT NOT NULL,
        icon TEXT NOT NULL
    );`,

    // `CREATE TABLE IF NOT EXISTS doc_templates(
    //     doc_template_uid INT NOT NULL PRIMARY KEY,
    //     path TEXT NOT NULL
    // );`,

    // `CREATE TABLE IF NOT EXISTS docs(
    //     doc_id INT NOT NULL PRIMARY KEY,
    //     doc_template_uid INT NOT NULL REFERENCES doc_templates (doc_template_uid),
    //     type TEXT,
    //     path TEXT NOT NULL
    // );`,

    `CREATE TABLE IF NOT EXISTS banks(
        id INT PRIMARY KEY,
        name TEXT NOT NULL
    );
    
    CREATE INDEX bank_name ON banks (name);
    `,

    `CREATE TABLE IF NOT EXISTS branches(
        id BIGSERIAL PRIMARY KEY,
        bank_code INT NOT NULL,
        bank_name TEXT NOT NULL,             
        branch_code TEXT NOT NULL,
        branch_name TEXT NOT NULL,
        branch_address TEXT NOT NULL,
        city TEXT NOT NULL,
        zip_code TEXT,
        pob TEXT,
        phone TEXT NOT NULL,
        fax TEXT NOT NULL,
        free_tel TEXT,
        handicap_access TEXT NOT NULL,
        day_closed TEXT,
        branch_type TEXT NOT NULL,
        date_open TEXT NOT NULL,
        date_closed TEXT,
        merge_bank TEXT,
        merge_branch TEXT,
        x_coord TEXT NOT NULL,
        y_coord TEXT NOT NULL
        
    );
        CREATE INDEX branch_bank_code_index ON branches (bank_code);
    `,

    `CREATE TABLE IF NOT EXISTS trusted_by(
        id SERIAL PRIMARY KEY,
        company_name TEXT NOT NULL,
        logo TEXT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS purchase_statuses(
        id SERIAL PRIMARY KEY,
        status_name TEXT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS content(
        id serial,
        page_name TEXT NOT NULL,
        he JSON NOT NULL,
        en JSON NOT NULL,
        media JSON
    );
    CREATE INDEX page_name_index ON content (page_name);
    `,

    `CREATE TABLE IF NOT EXISTS contact_us_mail(
        id BIGSERIAL,
        user_name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS our_team(
        id serial,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        position TEXT NOT NULL,
        photo TEXT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS subscribers(
        id serial PRIMARY KEY,
        investor_id INT NOT NULL,
        project_id INT NOT NULL,
        subscribe_date TIMESTAMP NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS subscribers_projects(
        id serial PRIMARY KEY,
        investor_id INT NOT NULL,
        project_id INT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS purchases_projects(
        id serial PRIMARY KEY,
        investor_id INT NOT NULL,
        project_id INT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS admins(
        id serial,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        signin_token TEXT
    );`,
]

tables.forEach((item, i)=>{
    let query = item
    postgresClient.query(query, (err)=>{
        if(err) {
            console.log(`An error has been occured while creating table ${i} - ${err}`)
        } else {
            console.log(`Table ${i} succesfully created`)
        }
        
    })
})

