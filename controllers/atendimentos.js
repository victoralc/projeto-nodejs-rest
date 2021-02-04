module.exports = app => {
    app.get('/atendimentos', (req, res) => 
        res.send("You are in appointments page with GET method request"));

    app.post("/atendimentos", (req, res) => {
        console.log(req.body)
        res.send("Voce esta realizando um POST para rotas de /atendimentos")
    });
};