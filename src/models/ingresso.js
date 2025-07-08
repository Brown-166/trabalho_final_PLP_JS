class Ingresso {
    static proximoId = 1; // Variável estática para controlar o próximo ID
    constructor(precoDoIngresso, donoDoIngresso, eventoDoIngresso) {
        this.id = Ingresso.proximoId++;
        this.preco = precoDoIngresso;
        this.dono = donoDoIngresso;
        this.evento = eventoDoIngresso;
    }


    associarAoEvento() {
        if (this.evento.listaDeIngressos.length < this.evento.maximoDeIngressos) {
            this.evento.listaDeIngressos.push(this);
            return `Ingresso ${this.id} associado ao evento "${this.evento.nome}" com sucesso!`;
        } else {
            return `Não é possível associar o ingresso ${this.id} ao evento "${this.evento.nome}". O evento já atingiu o número máximo de ingressos.`;
        }
    }
}

export default Ingresso;