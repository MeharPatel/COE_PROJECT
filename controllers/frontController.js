class frontController{

    static login = async(req, res) => {
        try{
            res.render("login")
        }catch(error){
            console.log(error)
        }
    }
    static reg1 = async(req, res) => {
        try{
            res.render("reg1")
        }catch(error){
            console.log(error)
        }
    }
    static reg2 = async(req, res) => {
        try{
            res.render("reg2")
        }catch(error){
            console.log(error)
        }
    }
    static home = async(req, res) => {
        try{
            res.render("home")
        }catch(error){
            console.log(error)
        }
    }
    static jobs = async(req, res) => {
        try{
            res.render("jobs")
        }catch(error){
            console.log(error)
        }
    }
    static my_account = async(req, res) => {
        try{
            res.render("my_account")
        }catch(error){
            console.log(error)
        }
    }
    static job_details = async(req, res) => {
        try{
            res.render("job_details")
        }catch(error){
            console.log(error)
        }
    }
    static logout = async(req, res) => {
        try{
            res.redirect("/")
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = frontController