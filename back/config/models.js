const Bookshelf = require('../config/database')
const cascadeDelete = require('bookshelf-cascade-delete')

Bookshelf.plugin(cascadeDelete);

const subscribers_projects = Bookshelf.Model.extend({tableName: 'subscribers_projects'})
const purchases_projects = Bookshelf.Model.extend({tableName: 'purchases_projects'})
const visit = Bookshelf.Model.extend({tableName: 'visits'})
const subscriber = Bookshelf.Model.extend({tableName: 'subscribers'})
const purchase = Bookshelf.Model.extend({tableName: 'purchases'})
const content = Bookshelf.Model.extend({tableName: 'content'})
const admin = Bookshelf.Model.extend({tableName: 'admins'})
const contact_us_mail = Bookshelf.Model.extend({tableName: 'contact_us_mail'})
const project = Bookshelf.Model.extend({tableName: 'projects'})
const trusted_by = Bookshelf.Model.extend({tableName: 'trusted_by'})
const project_status = Bookshelf.Model.extend({tableName: 'project_statuses'})
const company_contact = Bookshelf.Model.extend({tableName: 'company_contacts'})
const bank = Bookshelf.Model.extend({tableName: 'banks'})
const purchase_status = Bookshelf.Model.extend({tableName: 'purchase_statuses'})
const investor = Bookshelf.Model.extend({tableName: 'investors'})
const enterpreneur = Bookshelf.Model.extend({tableName: 'enterpreneurs'})
const our_team = Bookshelf.Model.extend({tableName: 'our_team'})
const branch = Bookshelf.Model.extend({tableName: 'branches'})

const contents = Bookshelf.Collection.extend({
    model: content,
    orderBy: function (column, order) {
        return this.query(function (qb) {
            qb.orderBy(column, order);
        });
    }
});

module.exports = models = {
    subscribers_projects:  subscribers_projects,
    purchases_projects:  purchases_projects,
    visit: visit,
    trusted_by: trusted_by,
    project_status: project_status,
    company_contact: company_contact,
    purchase_status: purchase_status,
    subscriber: subscriber,
    our_team: our_team,
    purchase: purchase,
    content: content,
    admin: admin,
    contact_us_mail: contact_us_mail,
    branch: branch,

    contents: contents,

    bank: Bookshelf.Model.extend({
        tableName: 'banks',
        branches: function(){
            return this.hasMany(branch, 'bank_code')
        }
    }),

    project: Bookshelf.Model.extend({
        tableName: 'projects',
        enterpreneur: function(){
            return this.belongsTo(enterpreneur, 'enterpreneur_id')
        },
        project_statuses: function(){
            return this.belongsTo(project_status, 'status_id')
        },
        visits: function(){
            return this.hasMany(visit, 'project_id')
        },

        purchases: function(){
            return this.hasMany(purchase, 'project_id')
        },

        subscribers: function(){
            return this.hasMany(subscriber, 'project_id')
        },
        projects_subscribers: function() {
            return this.belongsToMany(project, 'subscribers_projects', 'project_id', 'investor_id')
        },
        projects_purchases: function() {
            return this.belongsToMany(project, 'purchases_projects', 'project_id', 'investor_id')
        },
    },
        {
            dependents: ['visits', 'purchases', 'subscribers', 'projects_subscribers', 'projects_purchases']
        }
    ),

    investor: Bookshelf.Model.extend({
        tableName: 'investors',
        banks: function(){
            return this.belongsTo(bank, 'bank_id')
        },

        subscribers: function(){
            return this.hasMany(subscriber, 'investor_id')
        },
        purchases: function(){
            return this.hasMany(purchase, 'investor_id')
        },
        subscribed_projects: function() {
            return this.belongsToMany(project, 'subscribers_projects', 'investor_id', 'project_id')
        },

        purchased_projects: function() {
            return this.belongsToMany(
                Bookshelf.Model.extend(
                    {
                        tableName: 'projects',
                        purchases: function () {
                            return this.hasMany(purchase, 'project_id')
                        }
                    }
                ),
                'purchases_projects',
                'investor_id',
                'project_id'
            )
        },
    },
        {
            dependents: ['subscribed_projects', 'purchased_projects']
        }
    ),

    enterpreneur: Bookshelf.Model.extend({
        tableName: 'enterpreneurs',
        projects: function(){
            return this.hasMany(
                Bookshelf.Model.extend(
                    {
                        tableName: 'projects',
                        statuses: function () {
                            return this.belongsTo(project_status, 'status_id')
                        }
                    }
                ),
                'enterpreneur_id'
            )
        },

    },
        {
            dependents: ['projects']
        }
    ),

}