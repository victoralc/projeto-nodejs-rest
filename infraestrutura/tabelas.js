class Tabelas {

    init(conexao) {
        this.conexao = conexao;
        this.criarAtendimentos();
    }

    criarAtendimentos(){
        const CRIAR_TABELA_ATENDIMENTOS_QUERY = `
            CREATE TABLE IF NOT EXISTS Atendimentos (
                id int NOT NULL AUTO_INCREMENT, 
                cliente varchar(50) NOT NULL, 
                pet varchar(20),
                servico varchar(20) NOT NULL, 
                status varchar(20) NOT NULL,
                observacoes text,
                data_agendada timestamp NOT NULL,
                data_criacao timestamp NOT NULL,
                PRIMARY KEY(id)
            )`;

        this.conexao.query(CRIAR_TABELA_ATENDIMENTOS_QUERY, error => {
            if (error) {
                console.log(error);
            } else {
                console.log('Tabela Atendimentos criada com sucesso');
            }
        });
    }

}

module.exports = new Tabelas;