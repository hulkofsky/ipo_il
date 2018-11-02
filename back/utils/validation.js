const _ = require('lodash')

class Validation {

    validateText(someTextString) {
        const regexp = /^[a-z\u0590-\u05fe0-9 ()_\-]+$/i

        if(_.isEmpty(someTextString)){
            return false
        }else if(regexp.test(someTextString)&&someTextString.length<30&&someTextString.length>2){
            return true
        }else{
            return false
        }
    }

    validatePhone(phone) {
        // (123) 456 7899
        // (123).456.7899
        // (123)-456-7899
        // 123-456-7899
        // 123 456 7899
        // 1234567899
        const regexp = /\(?([0-9]{2,3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

        if(_.isEmpty(phone)) {
            return false
        }else if(regexp.test(phone)){
            return true
        }else{
            return false
        }
    }

    validateVideoUrl(url){
        const regexp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/

        if(regexp.test(url)){
            return true
        }else{
            return false
        }
    }

    validateFb(url){
        const regexp = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/

        if(regexp.test(url)){
            return true
        }else{
            return false
        }
    }

    validateLinkedin(url){
        const regexp = /http(s)?:\/\/([\w]+\.)?linkedin\.com/

        if(regexp.test(url)){
            return true
        }else{
            return false
        }
    }

    validateTimestamp(date){
        const regexp = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/

        if(regexp.test(date)){
            date = new Date(date)
            if (date > new Date()){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }


    validateMoney(moneyNumber){
        const regexp = /[-+]?[0-9]*\.?[0-9]+/

        if(!moneyNumber||moneyNumber.toString().length>20) {
            return false
        }else if(regexp.test(moneyNumber)){
            return true
        }else{
            return false
        }
    }

    validateVAT(VAT_number){
        //const regexp = /^\d{5,20}$/

        if(_.isEmpty(VAT_number)) {
            return false
        }else if(VAT_number.length < 20 && VAT_number.length > 5){
            return true
        }else{
            return false
        }
    }

    validateAccountNum(accountNumber){
        const regexp = /^\d{1,30}$/

        if(_.isEmpty(accountNumber)) {
            return false
        }else if(regexp.test(accountNumber)){
            return true
        }else{
            return false
        }
    }

    validateEmail(email){
        const regexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

        if(_.isEmpty(email)) {
            return false
        }else if(regexp.test(email)){
            return true
        }else{
            return false
        }
    }

    validatePass(password){
        //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number or sp character:
        //const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        const regexp = /(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?!.*\s)[0-9a-zA-Z*$-+?_&=!%{}/'.]*$/
        //const regexp = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/ //must have special character

        if(_.isEmpty(password)){
            return false
        }else if(regexp.test(password)){
            return true
        }else{
            return false
        }

    }

    validateTeam(userData){
        let members

        if(typeof(userData) == 'string') {
            members = JSON.parse(userData)
        }else{
           members = userData
        }

        //console.log(members.first_name, 'members')

        for(let i=0; i<members.length;i++){
            if(members[i].first_name!="" && !this.validateText(members[i].first_name)){
                return {success: false, message: `Member ${i} first name validation failed`}
            }

            if(members[i].last_name!="" && !this.validateText(members[i].last_name)){
                return {success: false, message: `Member ${i} last name validation failed`}
            }

            if(members[i].position!="" && !this.validateText(members[i].position)){
                return {success: false, message: `Member ${i} position validation failed`}
            }

            if(members[i].fb_link!="" && !this.validateFb(members[i].fb_link)){
                return {success: false, message: `Member ${i} facebook link validation failed`}
            }

            if(members[i].linkedin_link!="" && !this.validateLinkedin(members[i].linkedin_link)){
                return {success: false, message: `Member ${i} linkedIn link validation failed`}
            }
        }
        return {success: true, message: `ok`}
    }

    validateCompany(userData){
        if(!this.validateText(userData.company_name)){
            return {success: false, message: 'Company name validation failed'}
        }

        if(!this.validateVAT(userData.vat_number)){
            return {success: false, message: 'VAT number validation failed'}
        }

        if(!this.validateText(userData.ceo_name)){
            return {success: false, message: 'CEO name validation failed'}
        }

        if(_.isEmpty(userData.country_of_registration)){
            return {success: false, message: 'Country of Registration validation failed'}
        }

        if(!this.validateEmail(userData.company_email)){
            return {success: false, message: 'Company email validation failed'}
        }

        if(!this.validatePhone(userData.company_phone)){
            return {success: false, message: 'Company phone validation failed'}
        }

        if(!this.validateMoney(userData.funding_sum)){
            return {success: false, message: 'Funding sum validation failed'}
        }

        if(!this.validateMoney(userData.last_year_sales)){
            return {success: false, message: 'Company sales validation failed'}
        }

        if(!this.validatePass(userData.password)){
            return {success: false, message: 'Password validation failed'}
        }

        if(userData.password!=userData.confPass){
            return {success: false, message: 'Passwords does not match'}
        }

        if(userData.video_url){
            if(!this.validateVideoUrl(userData.video_url)){
                return {success: false, message: 'Video url validation failed'}
            }
        }
        return {success: true, message: 'Ok'}
    }

    validateEntSignup(userData) {

        if (!this.validateText(userData.company_name)) {
            return {success: false, message: 'Company name validation failed'}
        }

        if (!this.validateVAT(userData.vat_number)) {
            return {success: false, message: 'VAT number validation failed'}
        }

        if (!this.validateText(userData.ceo_name)) {
            return {success: false, message: 'CEO name validation failed'}
        }

        if (_.isEmpty(userData.country_of_registration)) {
            return {success: false, message: 'Country of Registration validation failed'}
        }

        if (!this.validateEmail(userData.company_email)) {
            return {success: false, message: 'Company email validation failed'}
        }

        if (!this.validatePhone(userData.company_phone)) {
            return {success: false, message: 'Company phone validation failed'}
        }

        if (!this.validateMoney(userData.funding_sum)) {
            return {success: false, message: 'Funding sum validation failed'}
        }

        if (!this.validateMoney(userData.last_year_sales)) {
            return {success: false, message: 'Company sales validation failed'}
        }

        if (!this.validatePass(userData.password)) {
            return {success: false, message: 'Password validation failed'}
        }

        if (userData.password != userData.confPass) {
            return {success: false, message: 'Passwords does not match'}
        }

        if (userData.video_url) {
            if (!this.validateVideoUrl(userData.video_url)) {
                return {success: false, message: 'Video url validation failed'}
            }
        }

        //validating team members
        if (userData.team_members) {

            const members = JSON.parse(userData.team_members)
            for (let i = 0; i < members.length; i++) {
                if (!this.validateText(members[i].first_name)) {
                    return {success: false, message: `Member ${i} first name validation failed`}
                }

                if (!this.validateText(members[i].last_name)) {
                    return {success: false, message: `Member ${i} last name validation failed`}
                }

                if (!this.validateText(members[i].position)) {
                    return {success: false, message: `Member ${i} position validation failed`}
                }

                if (members[i].fb_link && !this.validateFb(members[i].fb_link)) {
                    return {success: false, message: `Member ${i} facebook link validation failed`}
                }

                if (members[i].linkedin_link && !this.validateLinkedin(members[i].linkedin_link)) {
                    return {success: false, message: `Member ${i} linkedIn link validation failed`}
                }
            }

        }
        return {success: true, message: `ok`}
    }

    //INVESTOR SIGN UP VALIDATION
    validateInvSignup(userData){
        if(!this.validateText(userData.first_name)){
            return {success: false, message: 'First name validation failed'}
        }

        if(!this.validateText(userData.last_name)){
            return {success: false, message: 'Last name validation failed'}
        }

        if(!this.validateEmail(userData.email)){
            return {success: false, message: 'Email validation failed'}
        }

        if(!this.validatePhone(userData.phone)){
            return {success: false, message: 'Phone validation failed'}
        }

        if(!this.validateAccountNum(userData.account_number)){
            return {success: false, message: 'Account number validation failed'}
        }

        if(!this.validatePass(userData.password)){
            return {success: false, message: 'Password validation failed'}
        }

        if(userData.password!=userData.confPass){
            return {success: false, message: 'Passwords does not match'}
        }

        if(userData.agree != undefined &&userData.agree==false){
            return {success: false, message: 'Pls accept terms of service'}
        }

        return {success: true, message: 'ok'}
    }

    //CREATE PROJECT FORM VALIDATION
    validateCreateProject(projectData, isUpdate) {
        if (!this.validateText(projectData.project_name)) {
            return {success: false, message: 'Project name validation failed'}
        }

        if (!this.validateText(projectData.project_field)) {
            return {success: false, message: 'Project field validation failed'}
        }

        if (projectData.project_description.length > 2048) {
            return {success: false, message: 'Project description validation failed'}
        }

        if (!this.validateVideoUrl(projectData.video_url)) {
            return {success: false, message: 'Video url validation failed'}
        }

        if(!isUpdate) {
            // if (!this.validateTimestamp(projectData.project_finish_date)) {
            //     return {success: false, message: 'Project finish date validation failed'}
            // }

            if (!this.validateMoney(projectData.money_to_collect)) {
                return {success: false, message: 'Project price validation failed'}
            }
        }

        // if(!_.isEmpty(projectData.project_team)) {
        //     console.log(projectData.project_team[0].first_name, 'project team')
        //
        //     const members = projectData.project_team
        //
        //
        //     for(let i=0; i<members.length;i++){
        //         if(members[i].first_name!="" && !this.validateText(members[i].first_name)){
        //             return {success: false, message: `Member ${i} first name validation failed`}
        //         }
        //
        //         if(members[i].last_name!="" && !this.validateText(members[i].last_name)){
        //             return {success: false, message: `Member ${i} last name validation failed`}
        //         }
        //
        //         if(members[i].position!="" && !this.validateText(members[i].position)){
        //             return {success: false, message: `Member ${i} position validation failed`}
        //         }
        //
        //         if(members[i].fb_link!="" && !this.validateFb(members[i].fb_link)){
        //             return {success: false, message: `Member ${i} facebook link validation failed`}
        //         }
        //
        //         if(members[i].linkedin_link!="" && !this.validateLinkedin(members[i].linkedin_link)){
        //             return {success: false, message: `Member ${i} linkedIn link validation failed`}
        //         }
        //     }
        // }

        return {success: true, message: `ok`}

    }

}

module.exports = Validation