


module.exports = {
    home: (req,res) =>{
        res.render('index',{
            title: "Server email",
            css: "header.css"
        })
    }
}