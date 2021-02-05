const conexao = require('../infraestrutura/conexao')
const moment = require('moment');

class Atendimento {

    adiciona(atendimento, res) {
        const data_criacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data_agendada = moment(atendimento.data_agendada, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const atendimentoComData = {...atendimento, data_criacao, data_agendada};

        const isValidDate = moment(data_agendada).isSameOrAfter(data_criacao);
        const isValidCliente = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: data_agendada,
                valido: isValidDate,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: atendimento.cliente,
                valido: isValidCliente,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros);
        } else {
            const insert_query = 'INSERT INTO Atendimentos SET ?';
            conexao.query(insert_query, atendimentoComData, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json(atendimento);
                }
            });
        }
    }

    lista(res) {
          const select_query = "SELECT * FROM Atendimentos";
          conexao.query(select_query, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
    
        conexao.query(sql, (erro, restultados) => { 
            const atendimento = restultados[0];
            if(erro) { 
                res.status(400).json(erro);
            } else {
                res.status(200).json(atendimento);
            }
        });
    
    }

    altera(id, valores, res) {
        if (valores.data_agendada) {
            valores.data_agendada = moment(valores.data_agendada, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const update_sql = 'UPDATE Atendimentos SET ? WHERE id=?';
        conexao.query(update_sql, [valores, id], (erro, resultados) => {
            if(erro) { 
                res.status(400).json(erro);
            } else {
                res.status(200).json({...valores, id});
            }
        });
    }

    delete(id, res) {
        const update_sql = 'DELETE FROM Atendimentos WHERE id=?';
        conexao.query(update_sql, id, (erro, resultados) => {
            if(erro) { 
                res.status(400).json(erro);
            } else {
                res.status(200).json("Atendimento removido com sucesso.");
            }
        });
    }

}

module.exports = new Atendimento;