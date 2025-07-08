
// cria a classe pessoa para ser usada como base para outras classes
class Pessoa {
    constructor(cpf, nomeCompleto, sexo, email) {
        if (!Pessoa.validarCPF(cpf)) {
            throw new Error('CPF inválido.');
        }

        if (!Pessoa.validarEmail(email)) {
            throw new Error('Email inválido.');
        }
        this.cpf = cpf;
        this.nomeCompleto = nomeCompleto;
        this.sexo = sexo;
        this.email = email;
        this.eventos = [];
    }

    static validarCPF(cpf) {
        // Implementar validação de CPF aqui
        return typeof cpf === 'string' && cpf.length === 11 && /^\d{11}$/.test(cpf);
    }

    static validarEmail(email) {
        return typeof email === 'string' && email.includes('@');
    }
    
    listarEventos() {
        return this.eventos;
    }
}

export default Pessoa;