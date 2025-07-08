import readline from 'readline-sync';
import Organizador from './src/models/organizador.js';
import Participante from './src/models/participante.js';
import Pessoa from './src/models/pessoa.js';


const organizadores = [];
const participantes = [];
const eventos = [];
const ingressos = [];
const precosPadraoPorEvento = new Map();

// Função para criar organizador
function criarOrganizador() {
    let cpf;
    let email;
    let nome;
    let sexo;
    do {
        cpf = readline.question('CPF do organizador: ');
        if (!Pessoa.validarCPF(cpf)) {
            console.log('CPF inválido. Tente novamente.');
        }
    } while (!Pessoa.validarCPF(cpf));
    
    nome = readline.question('Nome completo: ');
    sexo = readline.question('Sexo: ');

    do {
        email = readline.question('Email: ');
        if (!Pessoa.validarEmail(email)) {
            console.log('Email inválido. Tente novamente.');
        }
    } while (!Pessoa.validarEmail(email));

    const org = new Organizador(cpf, nome, sexo, email);
    organizadores.push(org);
    console.log('===============================')
    console.log('Organizador criado com sucesso!');
    console.log('===============================')

}

// Função para criar participante
function criarParticipante() {
    let cpf;
    let email;
    let nome;
    let sexo;

    do {
        cpf = readline.question('CPF do participante: ');
        if (!Pessoa.validarCPF(cpf)) {
            console.log('CPF inválido. Tente novamente.');
        }
    } while (!Pessoa.validarCPF(cpf));
    nome = readline.question('Nome completo: ');
    sexo = readline.question('Sexo: ');

    do {
        email = readline.question('Email: ');
        if (!Pessoa.validarEmail(email)) {
            console.log('Email inválido. Tente novamente.');
        }
    } while (!Pessoa.validarEmail(email));

    const saldo = readline.questionFloat("Saldo inicial: ");
    const part = new Participante(cpf, nome, sexo, email, saldo);
    participantes.push(part);

    console.log('===============================')
    console.log('Participante criado com sucesso!');
    console.log('===============================')

}

// Função para criar evento
function criarEvento() {
    if (organizadores.length === 0) {
        console.log('===============================')
        console.log('Nenhum organizador cadastrado.');
        console.log('===============================')
        return;
    }
    const orgIndex = readline.questionInt('Escolha o organizador pelo índice: ' + 
        organizadores.map((o, i) => `\n${i} - ${o.nomeCompleto}: `).join(''));
    const nome = readline.question('Nome do evento: ');
    const data = readline.question('Data do evento: ');
    const local = readline.question('Local do evento: ');
    const maxIngressos = readline.questionInt('Máximo de ingressos: ');
    const preco = readline.questionFloat('Preço do ingresso: ');
    const evento = organizadores[orgIndex].criarEvento(nome, data, local, maxIngressos);
    eventos.push(evento);
    precosPadraoPorEvento.set(evento.idEvento, preco);
    console.log('===============================')
    console.log('  Evento criado com sucesso!');
    console.log('===============================')
}

// Função para comprar ingresso
function comprarIngresso() {
    if (participantes.length === 0 || eventos.length === 0) {
        console.log('Cadastre participantes e eventos primeiro.');
        return;
    }
    const partIndex = readline.questionInt('Escolha o participante pelo índice: ' + 
        participantes.map((p, i) => `\n${i} - ${p.nomeCompleto}: `).join(''));
    const eventoIndex = readline.questionInt('Escolha o evento pelo índice: ' + 
        eventos.map((e, i) => `\n${i}: ${e.nome}`).join(''));

    const participante = participantes[partIndex];
    const eventoSelecionado = eventos[eventoIndex];

    const precoDoIngresso = precosPadraoPorEvento.get(eventoSelecionado.idEvento);
    if (precoDoIngresso === undefined) {
        console.log('Preço do ingresso não definido para este evento.');
        return;
    }
    const resultadoCompra = participante.comprarIngresso(eventoSelecionado, precoDoIngresso);
    if (resultadoCompra.sucesso) {
        ingressos.push(resultadoCompra.ingresso);
        console.log(resultadoCompra.mensagem);
        return;
    }
    else {
        console.log(resultadoCompra.mensagem);
        return; 
    }
}

// Exemplo de uso de map, filter, reduce e lambda
function relatorioIngressosPorEvento() {
    if (eventos.length === 0) {
        console.log('=============================')
        console.log('Nenhum evento cadastrado.');
        console.log('=============================')
        return;
    }
    eventos.forEach(evento => {
        const total = ingressos.filter(ing => ing.evento === evento).length;
        console.log(`Evento: ${evento.nome} - Ingressos vendidos: ${total}`);
    });
}

function totalArrecadadoPorEvento() {
    if (eventos.length === 0) {
        console.log('=============================')
        console.log('Nenhum evento cadastrado.');
        console.log('=============================')
        return;
    }
    const eventoIndex = readline.questionInt('Escolha o evento pelo índice: ' +
        eventos.map((e, i) => `\n${i} - ${e.nome}: `).join(''));
    const eventoSelecionado = eventos[eventoIndex];

    const total = ingressos
        .filter(ing => ing.evento === eventoSelecionado)
        .reduce((soma, ing) => soma + ing.preco, 0);
    console.log('========================================')  
    console.log(`Total arrecadado no evento "${eventoSelecionado.nome}": R$ ${total.toFixed(2)}`);
    console.log('========================================')
}


function menu() {
    let opcao;
    do {
        console.log('\n1. Criar Organizador');
        console.log('2. Criar Participante');
        console.log('3. Criar Evento');
        console.log('4. Comprar Ingresso');
        console.log('5. Relatório de Ingressos por Evento');
        console.log('6. Total Arrecadado por Evento');
        console.log('0. Sair\n');
        opcao = readline.questionInt('Escolha uma opção: ');
        switch (opcao) {
            case 1: criarOrganizador(); break;
            case 2: criarParticipante(); break;
            case 3: criarEvento(); break;
            case 4: comprarIngresso(); break;
            case 5: relatorioIngressosPorEvento(); break;
            case 6: totalArrecadadoPorEvento(); break;
            case 0: console.log('Saindo...'); break;
            default: console.log('Opção inválida!');
        }
    } while (opcao !== 0);
}

menu();