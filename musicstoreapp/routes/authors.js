module.exports = function (app){
    let authors = [{
        "name":"Eric",
        "group":"Eric",
        "rol":"Cantante"
    },{
        "name":"Antonio",
        "group":"Grupo1",
        "rol":"Batería"
    },{
        "name":"Mnauel",
        "group":"Grupo2",
        "rol":"Batería"
    },{
        "name":"Sofía",
        "group":"Grupo3",
        "rol":"Batería"
    },{
        "name":"Samuel",
        "group":"Grupo4",
        "rol":"Guitarrista"
    }];
    app.get("/authors",function (req,res){
        let response = {
            seller: "Autores",
            authors: authors
        };
        res.render("authors/authors.twig",response)
    });
    app.get("/authors/add", function (req, res) {
        let roles = [{
            "name": "Cantante",
            "value": "cantante"
        },{
            "name": "Batería",
            "value": "batería"
        },{
            "name": "Guitarrista",
            "value": "guitarrista"
        },{
            "name": "Bajista",
            "value": "bajista"
        },{
            "name": "Pianista",
            "value": "pianista"
        }];

        let response = {
            roles: roles
        };

        res.render("authors/add.twig", response);
    });
    app.post("/authors/add", function (req, res) {
        let response = "";
        if (req.body.name !== null && typeof(req.body.name) != "undefined" && req.body.name.trim() !== "") {
            response = "Nombre: " + req.body.name + "<br>";
        } else {
            response += "name no enviado en la petición" + "<br>";
        }
        if (req.body.group !== null && typeof(req.body.group) != "undefined" && req.body.group.trim() !== "") {
            response += "Grupo: " + req.body.group + "<br>";
        } else {
            response += "group no enviado en la petición" + "<br>";
        }
        if (req.body.role !== null && typeof(req.body.role) != "undefined" && req.body.role.trim() !== "") {
            response += "Rol: " + req.body.role + "<br>";
        } else {
            response += "role no enviado en la petición" + "<br>";
        }
        res.send(response);
    });
    app.get("/authors/filter/:rol", function (req, res) {
        let response = {
            seller: "Autores",
            authors: authors.filter(author => author.rol.toLowerCase().trim() === req.params.rol.toLowerCase().trim())
        };
        res.render("authors/authors.twig", response);
    });
    app.get("/authors/*", function (req, res) {
        res.redirect("/authors");
    });
}