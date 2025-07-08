import Pessoa from './pessoa.js';
import Ingresso from './ingresso.js';
// cria a classe participante, que herda de pessoa
class Participante extends Pessoa {
    static proximoId = 1;

    constructor(cpf, nomeCompleto, sexo, email, dinheiroNaConta) {
        super(cpf, nomeCompleto, sexo, email); // Chama o construtor da classe Pessoa
        this.id = Participante.proximoId++;
        this.eventosParticipantes = [];
        this.dinheiroNaConta = dinheiroNaConta || 0; // Inicializa com 0 se não for fornecido
    }

    listarEventos() {
        return this.eventosParticipantes.map(evento => evento.nome);
    }

    comprarIngresso(eventoAlvo, precoDoIngresso) {
        if (!eventoAlvo) {
            return { sucesso: false, mensagem: 'Evento não encontrado.' };
        }
        if (this.dinheiroNaConta < precoDoIngresso) {
            return { sucesso: false, mensagem: 'Saldo insuficiente para comprar o ingresso.' };
        }

        const novoIngresso = new Ingresso(precoDoIngresso, this, eventoAlvo);
        const resultadoAssosiacao = novoIngresso.associarAoEvento();

        if (resultadoAssosiacao.includes('sucesso')) {
            this.dinheiroNaConta -= precoDoIngresso; // Deduz o valor do ingresso do saldo
            this.eventosParticipantes.push(eventoAlvo); // Adiciona o evento à lista de eventos do participante
            return { sucesso: true, mensagem: `Ingresso ${novoIngresso.id} comprado com sucesso para o evento ${eventoAlvo.nome}!`,
                        ingresso: novoIngresso 
        };
        } else {
            return { sucesso: false, mensagem: resultadoAssosiacao };
        }
    }


}

export default Participante;