module.exports = {
    home: (req,res) =>{
        res.render('index',{
            title: "API portafolio",
            cssHeader: "../header.css",
            cssIndex: "index.css"
        })
    }
}