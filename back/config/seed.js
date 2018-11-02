const {Client} = require('pg')
const keys = require('./keys')
const Bookshelf = require('./database')
const projects = require('./tables/projects')
const project_statuses = require('./tables/project_statuses')
const contents = require('./tables/content')
const company_contacts = require('./tables/conpany_contacts')
const banks = require('./tables/banks')
const purchase_statuses = require('./tables/purchase_statuses')
const investors = require('./tables/investors')
const enterpreneurs = require('./tables/enterpreneurs')
const our_team = require('./tables/our_team')
const purchases = require('./tables/purchases')
const subscribers = require('./tables/subscribers')
const visits = require('./tables/visits')
const admins = require('./tables/admins')
const purchases_projects = require('./tables/purchases_projects')
const subscribers_projects = require('./tables/subscribers_projects')
const trusted_by = require('./tables/trusted')
const branches = require('./tables/branches')

const models = require('./models')

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

//table branches
branches.forEach((item, i)=>{
    models.branch
        .forge({
            bank_code: item.bank_code,
            bank_name: item.bank_name,
            branch_code: item.branch_code,
            branch_name: item.branch_name,
            branch_address: item.branch_address,
            city: item.city,
            zip_code: item.zip_code,
            phone: item.phone,
            fax: item.phone,
            handicap_access: item.phone,
            day_closed: item.day_closed,
            branch_type: item.branch_type,
            date_open: item.date_open,
            x_coord: item.x_coord,
            y_coord: item.y_coord
        })
        .save()
        .then(content=>{
           // console.log(`branch ${item.branch_code} successfully inserted`)
        })
        .catch(err=>{
            console.log(`Error while inserting branches ${item.branch_code} - ${err}`)
        })
})

//table subscribers_projects
subscribers_projects.forEach((item, i)=>{
    models.subscribers_projects
        .forge({
            investor_id: item.investor_id,
            project_id: item.project_id
        })
        .save()
        .then(content=>{
            console.log(`subscribers_projects ${i} successfully inserted`)
        })
        .catch(err=>{
            console.log(`Error while inserting subscribers_projects ${i} - ${err}`)
        })
})

//table purchases_projectspurchases_projects
purchases_projects.forEach((item, i)=>{
    models.purchases_projects
        .forge({
            investor_id: item.investor_id,
            project_id: item.project_id
        })
        .save()
        .then(content=>{
            console.log(`purchases_projects ${i} successfully inserted`)
        })
        .catch(err=>{
            console.log(`Error while inserting purchases_projects ${i} - ${err}`)
        })
})

//table admins
admins.forEach((item, i)=>{
    models.admin
        .forge({
            username: item.username,
            password: item.password,
            email: item.email
        })
        .save()
        .then(content=>{
            console.log(`Admin ${item.username} successfully inserted`)
        })
        .catch(err=>{
            console.log(`Error while inserting Visit ${item.username} - ${err}`)
        })
})

//table trusted_by
trusted_by.forEach((item, i)=>{
    models.trusted_by
        .forge({
            company_name: item.company_name,
            logo: item.logo
        })
        .save()
        .then(content=>{
            console.log(`trusted_by ${item.company_name} successfully inserted`)
        })
        .catch(err=>{
            console.log(`Error while inserting trusted_by ${item.company_name} - ${err}`)
        })
})

//table visits
visits.forEach((item, i)=>{
    models.visit
    .forge({
        project_id: item.project_id,
        visit_date: item.visit_date
    })
    .save()
    .then(content=>{
        console.log(`Visit ${i} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting Visit ${i} - ${err}`)
    })
})

//table subscribers
subscribers.forEach((item, i)=>{
    models.subscriber
    .forge({
        investor_id: item.investor_id,
        project_id: item.project_id,
        subscribe_date: item.subscribe_date
    })
    .save()
    .then(content=>{
        console.log(`Subscriber ${i} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting Subscriber ${i} - ${err}`)
    })
})

//table purchases
purchases.forEach((item, i)=>{
    models.purchase
    .forge({
        investor_id: item.investor_id,
        project_id: item.project_id ,
        purchase_date: item.purchase_date,
        status_id: item.status_id,
        po_doc: item.po_doc,
        unit_count: item.unit_count,
        unit_price: item.unit_price,
    })
    .save()
    .then(content=>{
        console.log(`Purchase ${i} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting Purchase ${i} - ${err}`)
    })
})

//table our_team
our_team.forEach((item, i)=>{
    models.our_team
    .forge({
        first_name: item.first_name,
        last_name: item.last_name,
        position: item.position,
        photo: item.photo
    })
    .save()
    .then(content=>{
        console.log(`Our_team ${item.first_name} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting Our_team ${item.first_name} - ${err}`)
    })
})

//table enterpreneurs
enterpreneurs.forEach((item, i)=>{
    models.enterpreneur
    .forge({
        company_name: item.company_name,
        vat_number: item.vat_number,
        ceo_name: item.ceo_name,
        country_of_registration: item.country_of_registration,
        company_email: item.company_email,
        company_phone: item.company_phone,
        funding_sum: item.funding_sum,
        last_year_sales: item.last_year_sales,
        password: item.password,
        video_url: item.video_url,

        company_presentation: item.company_presentation,
        financial_report: item.financial_report,

        team_members: item.team_members,

        email_conf: item.email_conf,
        phone_conf: item.phone_conf,
        project_eval_notification: item.project_eval_notification,
        project_running_notification: item.project_running_notification,
        project_subscription_notification: item.project_subscription_notification,
        project_purchases_notification: item.project_purchases_notification,
        project_deleted_notification: item.project_deleted_notification,
        project_edited_notification: item.project_edited_notification,
        project_days_left_notification: item.project_days_left_notification,
    })
    .save()
    .then(content=>{
        console.log(`Enterpreneur ${item.company_name} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting Enterpreneur ${item.company_name} - ${err}`)
    })
})

//table investors
investors.forEach((item, i)=>{
    models.investor
    .forge({
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        phone: item.phone,
        bank_id: item.bank_id,
        branch_code: item.branch_code,
        password: item.password,
        account_number: item.account_number,

        email_conf: item.email_conf,
        phone_conf: item.phone_conf,

        project_running_notification: item.project_running_notification,
        project_subscription_notification: item.project_subscription_notification,
        project_purchases_notification: item.project_purchases_notification,
        project_deleted_notification: item.project_deleted_notification,
        project_edited_notification: item.project_edited_notification,
        project_days_left_notification: item.project_days_left_notification,
    })
    .save()
    .then(content=>{
        console.log(`Investor ${item.first_name} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting Investor ${item.first_name} - ${err}`)
    })
})

// //table purchase_statuses
purchase_statuses.forEach((item, i)=>{
    models.purchase_status
    .forge({
        status_name: item.status_name
    })
    .save()
    .then(content=>{
        console.log(`Purchase_status ${i} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting Purchase_status ${i} - ${err}`)
    })
})

//table banks
banks.forEach((item, i)=>{
    models.bank
    .forge({
        id: item.id,
        name: item.name,
    })
    .save(null, {method: 'insert'})
    .then(content=>{
        console.log(`Bank ${i} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting Bank ${i} - ${err}`)
    })
})

//table company_contacts
company_contacts.forEach((item, i)=>{
    models.company_contact
    .forge({
        contact: item.contact,
        icon: item.icon
    })
    .save()
    .then(content=>{
        console.log(`Company_contact ${item.contact} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting Company_contact ${item.contact} - ${err}`)
    })
})

//table content
contents.forEach((item)=>{
    models.content
    .forge({
        page_name: item.page_name,
        en: item.en,
        he: item.he,
        media: item.media
    })
    .save()
    .then(content=>{
        console.log(`content ${item.page_name} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting content ${item.page_name} - ${err}`)
    })
})

//table projects
projects.forEach((item, i)=>{
    models.project
    .forge({
        enterpreneur_id: item.enterpreneur_id,
        project_name: item.project_name,
        project_field: item.project_field,
        project_description: item.project_description,
        status_id: item.status_id,
        money_to_collect: item.money_to_collect,
        money_collected: item.money_collected,
        video_url: item.video_url,
        project_start_date: new Date(),
        project_finish_date: item.project_finish_date,
        tashkif_file: item.tashkif_file,
        project_files: item.project_files,
        project_team: item.project_team,
        learn_more: item.learn_more,
        is_talking_about_us: item.is_talking_about_us,
        articles: item.articles,
        company_link: item.company_link,

        unit_name1: item.unit_name1,
        unit_name2: item.unit_name2,
        unit_name3: item.unit_name3,
        min_total_price1: item.min_total_price1,
        max_total_price1: item.max_total_price1,
        min_units1: item.min_units1,
        min_total_price2: item.min_total_price2,
        max_total_price2: item.max_total_price2,
        min_units2: item.min_units2,
        min_total_price3: item.min_total_price3,
        max_total_price3: item.max_total_price3,
        min_units3: item.min_units3,
        project_type: item.project_type,
    })
    .save()
    .then(project=>{
        console.log(`project ${item.project_name} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting project ${item.project_name} - ${err}`)
    })
})

console.log(project_statuses)

//table project_statuses
project_statuses.forEach((item, i)=>{
    models.project_status
    .forge({
        status_name: item.status_name,
    })
    .save()
    .then(project_status=>{
        console.log(`project_status ${i} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting project_status ${i} - ${err}`)
    })
})







