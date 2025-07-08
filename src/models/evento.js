// cria uma classe evento
class Evento {

    static proximoId = 0; 
    // cria um construtor que recebe os parametros necessarios pra criar um evento
    constructor(nomeDoEvento, dataDoEvento, localDoEvento, maximoDeIngressos, organizadorDoEvento) {
        this.idEvento = Evento.proximoId++;
        this.nome = nomeDoEvento;
        this.data = new Date(dataDoEvento);
        this.local = localDoEvento;
        this.listaDeIngressos = [];
        this.maximoDeIngressos = maximoDeIngressos;
        this.organizador = organizadorDoEvento; // Referência ao organizador do evento
    }
    // cria um metodo que retorna o nome do evento
    verIngressosDisponiveis() {
         const ingressosDisponiveis = this.maximoDeIngressos - this.listaDeIngressos.length;
         return `Ingressos disponíveis para o evento ${this.nome}: ${ingressosDisponiveis}`;
    }
}

export default Evento;