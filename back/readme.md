1) Create db edo
2) node config/createTables
3) node config/seed
4) node config/alterTables

HOMEPAGE:
GET => /
req:
headers=>{
    token: .. not required
    language: HE||EN not required
} 

res: 
{
    success: true||false
    data: {
        pageContent: ...
        projects: all awailable projects
        user: enterpreneur||investor||undefined
    }||error message
}

GET => /howdoesitwork
req:
headers=>{
    token: .. not required
    language: HE||EN not required
} 

res: 
{
    success: true||false
    data: {
        pageContent: ...
        user: enterpreneur||investor||undefined
    }||error message
}

GET => /aboutus
req:
headers=>{
    token: .. not required
    language: HE||EN not required
} 

res: 
{
    success: true||false
    data: {
        pageContent: ...
        team_members: ...
        user: enterpreneur||investor||undefined
    }||error message
}

GET => /howweareworking
req:
headers=>{
    token: .. not required
    language: HE||EN not required
} 

res: 
{
    success: true||false
    data: {
        pageContent: ...
        user: enterpreneur||investor||undefined
    }||error message
}

GET => /contactus
req:
headers=>{
    token: .. not required
    language: HE||EN not required
} 

res: 
{
    success: true||false
    data: {
        pageContent: ...
        user: enterpreneur||investor||undefined
    }||error message
}

GET => /login
req:
headers=>{
    language: HE||EN not required
} 

res: 
{
    success: true||false
    data: {
        pageContent: ...
    }||error message
}

GET => /signup
req:
headers=>{
    language: HE||EN not required
} 

res: 
{
    success: true||false
    data: {
        pageContent: ...
    }||error message
}

GET => /project/:id
req:
headers=>{
    language: HE||EN not required
    token: .. not required
} 

res: 
{
    success: true||false
    data: {
        pageContent: ...
        project: ...
        user: enterpreneur||investor||undefined
    }||error message
}


AUTHENTICATION/REGISTRATION:

POST => /signupinvestor
req:
body=>{
    first_name:axel
    last_name:rose
    email:axel@gmail.com
    phone:2222222222
    bank_name:Bank Leumi
    account_number:11111222223333344444
    password:Aaaaaa11
    confPass: Aaaaaa11
    agree:true
}
res:
{
    success: true||false
    data: {
        id: ...
    }||error message
}

POST => /signupenterpreneur
req:
body=>{
    company_name:monolith
    vat_number:987524126
    ceo_name:George Washington
    country_of_registration: Zimbabwe
    company_email:monolith@gmail.com
    company_phone:8888888888
    funding_sum:9999999
    last_year_sales:7777777
    password:Mmmmmm11
    confPass: Mmmmmm11
}
res: 
{
    success: true||false
    data: {
        id: ...
    }||error message
}

POST => /signin
req:
body=>{
    email: ...
    password: ...
}
res: 
{
    success: true||false
    data: {
        success: true||false
        token: ...
        user: enterpreneur||investor||undefined
    }||error message
}

POST => /forgotpassword
req:
body=>{
    email: ...
}
res: 
{
    success: true||false
    data: {
        success: true||false
        message: ...
    }
}

POST => /reset/:token
req:
body=>{
    password: ...
    confPass: ...
}
res: 
{
    success: true||false
    data: {
        success: true||false
        message: ...
    }
}


CONTACT US ROUTES:

POST => /send
req:
body=>{
    email: ...
    username: ...
    message: ...
}
res: 
{
    success: true||false
    data: {
        success: true||false
        message: ...
    }
}

PROJECT PAGE:

GET => /:investorId/purchase/:projectId
req:
headers=>{
    token: ... not required
    language: HE||EN not required
} 
res: 
{
    success: true||false
    data: {
        success: true||false
        data: {
            pageContent: ...,
            banks: ...,
            user: investor||undefined
        }||error message
    }
}

POST => /:investorId/subscribe/:projectId
req:
headers=>{
    token: ... not required
} 
res: 
{
    success: true||false
    data: {
        success: true||false
        data: {
           message: ...
        }
    }
}


STEPS:

POST => /firstcheck
req:
body=>{
    first_name:axel
    last_name:rose
    email:axel@gmail.com
    phone:2222222222
} 
res: 
{
    success: true||false
    data: {
        success: true||false
        data: {
           message: ...
        }
    }
}

POST => /secondcheck
req:
body=>{
    account_number:11111222223333344444
    password:Aaaaaa11
    confPass: Aaaaaa11
    agree:true
} 
res: 
{
    success: true||false
    data: {
        success: true||false
        data: {
           message: ...
        }
    }
}

POST => /:investorId/purchase/:projectId
req:
headers=>{
    token: ... required
}
body=>{
    unit_count: ..., required
    
} 
res: 
{
    success: true||false
    data: {
        success: true||false
        data: {
           message: ...
        }
    }
}



ENTERPRENEUR DASHBOARD:

PUT /enterpreneur/:entId/project/:projectId

body {
    project_name:Quake 4
    project_field:Games
    project_description:Best shooter ever
    video_url:https://www.youtube.com/watch?v=L0BrihSiEdQ
    min_total_price:1
    min_units:20
    project_team: [
                    {
                  		"first_name": "John",
                  		"last_name": "Doe",
                  		"position": "vice president",
                  		"fb_link": "https://www.facebook.com/userusereshelme",
                  		"linkedin_link": "https://www.linkedin.com/",
                  		"photo": "data:image"
                  	},
                  	{
                  		"first_name": "Eva",
                  		"last_name": "Muller",
                  		"position": "associate",
                  		"fb_link": "https://www.facebook.com/userusereshelme",
                  		"linkedin_link": "https://www.linkedin.com/",
                  		"photo": "data:image"
                  	},
                  	{
                  		"first_name": "Walker",
                  		"last_name": "Dillon",
                  		"position": "CTO",
                  		"fb_link": "https://www.facebook.com/usereshelme",
                  		"linkedin_link": "https://www.linkedin.com/",
                  		"photo": "data:image"
                  	}                
                  ]
}

=> {
       "success": true,
       "data": {
           "message": `Project ${project_name} succesfully updated.`
       }
   }
   
   
INVESTOR DASHBOARD:

GET /:investorId/subscribedProjects
req:
headers=>{
    token: .. required
    language: HE||EN not required
}
res: 
   {
       success: true||false,
       data: {
           pageContent: ...,
           banks: ...,
           data: investor with subscribed_projects
       }||error message
       
   }

}

GET /:investorId/purchasedprojects
req:
headers=>{
    token: .. required
    language: HE||EN not required
}
res: 
   {
       success: true||false,
       data: {
           pageContent: ...,
           banks: ...,
           data: investor with purchased_projects
       }||error message   
   }
}

GET /:investorId/purchasedprojects/:projectId
req:
headers=>{
    token: .. required
    language: HE||EN not required
}
res:
{
    success: true||false,
    data: {
        pageContent: ,
        project: ,
        user: 
    }||error message
}

DELETE /:investorId/purchasedprojects/:projectId
req:
headers=>{
    token: .. required
}
res: 
{
   "success": true,
   "data": {
       "message": `Project succesfully deleted.`
   }
}

GET /:investorId/subscribedProjects/:projectId
req:
headers=>{
    token: .. required
    language: HE||EN not required
}
res: 
{
    success: true||false,
    data: {
        pageContent: ,
        project: ,
        user: 
    }||error message
}

DELETE /:investorId/subscribedProjects/:projectId
req:
headers=>{
    token: .. required
}
res: 
{
   "success": true,
   "data": {
       "message": `Project succesfully deleted.`
   }
}

GET /:investorId/purchasedprojects/:projectId/statistics
req:
headers=>{
    token: .. required
    language: HE||EN not required
}
res: 
{
    success: true||false,
    data: {
        pageContent: ,
        project: ,
        user: 
    }||error message
}

GET /:investorId/myprofile
req:
headers=>{
    token: .. required
    language: HE||EN not required
}
res:
{
    success: true||false,
    data: {
        pageContent: ,
        usersettings: 
    }||error message
}

PUT /investor/:investorId/myprofile

req:
headers=>{
    token: .. required
    language: HE||EN not required
}
body {
    first_name: Jennifer
    last_name: Jefferson
    email: jenny@gmail.com
    phone: 1111111111
    bank_id: 165448456204891223458499
    password: Jjjjjj11
    confPass: Jjjjjj11
    account_number: 123456789456123456789
    agree: true
    bank_name: Bank Leumi
}
res:
{
  "success": true,
  "data": {
      "message": "User details updated"
  }
}

GET /:investorId/settings

req: 
headers=>{
    token: .. required
    language: HE||EN not required
}
res:
{
    success: true||false,
    data: {
        pageContent: ,
        usersettings: 
    }||error message
}

GET /:investorId/terms

req: 
headers=>{
    token: .. required
    language: HE||EN not required
}
res:
{
    success: true||false,
    data: {
        pageContent: ,
    }||error message
}

POST /:investorId/settings

req: 
headers=>{
    token: .. required
    language: HE||EN not required
}
body=>{
    value: boolean;
    type running||subscribtion||purchase||deleted||edited||days_left
}
res:
{
    success: true||false,
    data: {
        message: ...,
    }||error message
}