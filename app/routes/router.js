const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/index", { "listaErros": null, "resultado": null, "valores": { "idade": "digite sua idade" } });
});
router.post("/calcular", (req, res) => {
 
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const valor = Number(req.body.valor);
    let erros = [];
 
    if (!nome || nome.trim().length < 3) {
 
        erros.push("Nome deve ter no mínimo 3 caracteres.");
    }
    if (!cpf || cpf.length !== 11 || isNaN(cpf)) {
 
        erros.push("CPF deve possuir 11 números.");
    }
    if (!valor || valor <= 0) {
 
        erros.push("Valor da compra deve ser maior que zero.");
    }
    if (erros.length > 0) {
 
        return res.send(erros.join("<br>"));
    }
    let percentual = 0;
 
    if (valor <= 100) {
 
        percentual = 2;
    } else if (valor <= 500) {
 
        percentual = 7;
    } else if (valor <= 1500) {
 
        percentual = 12;
    } else {
        percentual = 18;
    }
 
    const valorDesconto = valor * percentual / 100;
    const valorFinal = valor - valorDesconto;
 
    res.render("resultado", {
        nome,
        cpf,
        valor,
        percentual,
        valorDesconto,
        valorFinal
 
    });
 
});

module.exports = router;