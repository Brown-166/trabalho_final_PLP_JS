import Pessoa from './pessoa.js';
import Evento from './evento.js';
// cria a classe organizador, que herda de pessoa
class Organizador extends Pessoa {
    static proximoId = 1;

    constructor(cpf, nomeCompleto, sexo, email) {
        super(cpf, nomeCompleto, sexo, email); // Chama o construtor da classe Pessoa
        this.id = Organizador.proximoId++;
        this.eventosOrganizados = [];
    }
// adiciona um método pra criar eventos
    criarEvento(nomeDoEvento, dataDoEvento, localDoEvento, maximoDeIngressos) {
        const novoEvento = new Evento(nomeDoEvento, dataDoEvento, localDoEvento, maximoDeIngressos, this);
        this.eventosOrganizados.push(novoEvento);
        return novoEvento;
    }
}

export default Organizador;