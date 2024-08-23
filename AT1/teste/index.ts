import Entrada from "./entrada";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/tipoDocumento";
import Dependente from "../modelos/dependente";

let clientes: Cliente[] = [];
let execution = true;

console.log(`\nOlá, bem-vindo ao sistema do parque aquático!\n`);

while (execution) {
    console.log(`O que deseja fazer?\n`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Cadastrar dependente`);
    console.log(`3 - Listar clientes`);
    console.log(`4 - Listar dependentes`);
    console.log(`5 - Sair\n`);

    let entrada = new Entrada();
    let opcao = entrada.receberNumero("Digite a opção desejada");

    switch (opcao) {
        case 1:
            console.log(`\nCadastro de cliente:\n`);
            let nome = entrada.receberTexto("Digite o nome do cliente");
            let nomeSocial = entrada.receberTexto("Digite o nome social do cliente");
            let dataNascimento = entrada.receberData("Digite a data de nascimento do cliente (DD-MM-YYYY)");
            let dataCadastro = entrada.receberData("Digite a data de cadastro do cliente (DD-MM-YYYY)");
            let endereco = Endereco.cadastrarEndereco();
            let ddd = entrada.receberTexto("Digite o DDD do telefone");
            let numero = entrada.receberTexto("Digite o número do telefone");
            let telefones = [new Telefone(ddd, numero)];
            let numeroDocumento = entrada.receberTexto("Digite o número do documento");
            let tipoDocumento = entrada.receberTexto("Digite o tipo do documento (CPF, RG, Passaporte)");
            let dataExpedicao = entrada.receberData("Digite a data de expedição do documento (DD-MM-YYYY): ");
            let documento = new Documento(numeroDocumento, tipoDocumento as TipoDocumento, dataExpedicao);
            let cliente = new Cliente(nome, nomeSocial, dataNascimento, dataCadastro, endereco, telefones);
            cliente.documentos.push(documento);
            clientes.push(cliente);

            console.log(`\nCliente cadastrado com sucesso!\n`);
            break;

        case 2:
            console.log(`\nCadastro de dependente:`);
            if (clientes.length === 0) {
                console.log("\nNenhum cliente cadastrado. Cadastre um cliente antes de adicionar dependentes.\n");
                execution = false;
                break;
            };
            console.log("\nSelecione o titular do dependente:\n");
            clientes.forEach((cliente, index) => {
                console.log(`${index + 1} - ${cliente.nome}`);
            });
            console.log("");
            let titularIndex = entrada.receberNumero("Digite o número do cliente titular") - 1;

            if (titularIndex < 0 || titularIndex >= clientes.length) {
                console.log("\nCliente inválido.\n");
                break;
            };

            let titular = clientes[titularIndex];
            
            console.log(`\nCadastro de dependente do cliente ${titular.nome}:\n`);
            let nomeDependente = entrada.receberTexto("Digite o nome do dependente");
            let nomeSocialDependente = entrada.receberTexto("Digite o nome social do dependente");
            let dataNascimentoDependente = entrada.receberData("Digite a data de nascimento do dependente (DD-MM-YYYY)");
            let dataCadastroDependente = entrada.receberData("Digite a data de cadastro do dependente (DD-MM-YYYY)");
            let dddDependente = entrada.receberTexto("Digite o DDD do telefone do dependente");
            let numeroDependente = entrada.receberTexto("Digite o número do telefone do dependente");
            let telefonesDependente = [new Telefone(dddDependente, numeroDependente)];
            let numeroDocumentoDependente = entrada.receberTexto("Digite o número do documento do dependente");
            let tipoDocumentoDependente = entrada.receberTexto("Digite o tipo do documento do dependente (CPF, RG, Passaporte)");
            let dataExpedicaoDocumentoDependente = entrada.receberData("Digite a data de expedição do documento do dependente (DD-MM-YYYY)");
            let documentoDependente = new Documento(numeroDocumentoDependente, tipoDocumentoDependente as TipoDocumento, dataExpedicaoDocumentoDependente);

            let dependente = new Dependente(
                nomeDependente,
                nomeSocialDependente,
                dataNascimentoDependente,
                dataCadastroDependente,
                telefonesDependente,
                titular
            );
            dependente.documentos.push(documentoDependente);

            titular.dependentes.push(dependente);

            console.log(`\nDependente cadastrado com sucesso!\n`);
            break;
        case 3:
            console.log(`\nLista de clientes:\n`);
            if (clientes.length === 0) {
                console.log("Nenhum cliente cadastrado.\n");
                execution = false;
                break;
            };
            clientes.forEach((cliente, index) => {
                console.log(`${index + 1} - Nome: ${cliente.nome}`);
                console.log(`    Nome Social: ${cliente.nomeSocial}`);
                console.log(`    Data de Nascimento: ${cliente.dataNascimento.toLocaleDateString()}`);
                console.log(`    Data de Cadastro: ${cliente.dataCadastro.toLocaleDateString()}`);
                console.log(`    Endereço: ${cliente.endereco.rua}, ${cliente.endereco.bairro}, ${cliente.endereco.cidade}, ${cliente.endereco.estado}, ${cliente.endereco.pais}, ${cliente.endereco.codigoPostal}`);
                console.log(`    Telefones: ${cliente.telefones.map(t => `(${t.ddd}) ${t.numero}`).join(", ")}`);
                console.log(`    Documentos: ${cliente.documentos.map(d => `${d.numero} (${d.tipo})`).join(", ")}`);
                console.log(`    Dependentes: ${cliente.dependentes.map(d => d.nome).join(", ")}\n`);
            });
            break;
        case 4:
            console.log(`\nLista de dependentes:\n`);
            if (clientes.length === 0) {
                console.log(`Nenhum dependete cadastrado.\n`)
                execution = false;
                break;
            };
            clientes.forEach((cliente) => {
                if (cliente.dependentes != null) {
                    cliente.dependentes.forEach((dependente, index) => {
                        console.log(`${index + 1} - Nome: ${dependente.nome}`);
                        console.log(`    Nome Social: ${dependente.nomeSocial}`);
                        console.log(`    Data Nascimento: ${dependente.dataNascimento}`);
                        console.log(`    Data Cadastramento: ${dependente.dataCadastro}`);
                        console.log(`    Endereço: ${dependente.endereco.rua}, ${dependente.endereco.bairro}, ${dependente.endereco.cidade}, ${dependente.endereco.estado}, ${dependente.endereco.pais}, ${dependente.endereco.codigoPostal}`);
                        console.log(`    Telefones: ${dependente.telefones.map(t => `(${t.ddd}) ${t.numero}`).join(`, `)}`);
                        console.log(`    Documentos: ${dependente.documentos.map(d => `${d.numero} (${d.tipo})`).join(`, `)}`);
                        console.log(`    Cliente: ${dependente.titular.nome}\n`)
                    });
                };
            });
            break;
        case 5:
            console.log(`\nSaindo...\n`);
            execution = false;
            break;
        default:
            console.log(`\nOpção inválida!\n`);
            break;
    };
};