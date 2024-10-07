import { AppDataSource } from "../../data-source";
import { Cliente } from "../../model/cliente/cliente";
import { Documento } from "../../model/cliente/documento";
import { Dependente } from "../../model/cliente/dependente";
import { Endereco } from "../../model/cliente/endereco";
import { Telefone } from "../../model/cliente/telefone";

export const clienteRepository = AppDataSource.getRepository(Cliente);
export const documentoRepository = AppDataSource.getRepository(Documento);
export const enderecoRepository = AppDataSource.getRepository(Endereco);
export const dependenteRepository = AppDataSource.getRepository(Dependente);
export const telefoneRepository = AppDataSource.getRepository(Telefone);

export const cadastrarCliente = async (
    nome: string, 
    nomeSocial: string, 
    dataNascimento: string, 
    rua: string, 
    bairro: string, 
    cidade: string, 
    estado: string, 
    cep: string, 
    ddd: string, 
    numero: string, 
    rg: string, 
    cpf: string, 
    passaporte: string
) => {
    try {
        // Validações de documentos (CPF, RG e Passaporte)
        if (await documentoRepository.findOneBy({ cpf })) {
            return { status: 400, message: "CPF já cadastrado!" };
        }

        if (await documentoRepository.findOneBy({ rg })) {
            return { status: 400, message: "RG já cadastrado!" };
        }

        if (await documentoRepository.findOneBy({ passaporte })) {
            return { status: 400, message: "Passaporte já cadastrado!" };
        }

        // Criação do cliente
        const cliente = new Cliente(nome, nomeSocial, dataNascimento);
        await clienteRepository.save(cliente);

        // Criação e vinculação do endereço
        const endereco = new Endereco(rua, bairro, cidade, estado, cep, cliente.clienteID);
        await enderecoRepository.save(endereco);

        // Criação e vinculação do documento
        const documento = new Documento(rg, cpf, passaporte, cliente.clienteID);
        await documentoRepository.save(documento);

        // Criação e vinculação do telefone
        const telefone = new Telefone(ddd, numero, cliente.clienteID);
        await telefoneRepository.save(telefone);

        return { status: 200, message: "Cliente cadastrado com sucesso!" };

    } catch (error) {
        // Tratamento de erros
        console.error('Erro ao cadastrar cliente:', error);
        return { status: 500, message: "Erro ao cadastrar cliente." };
    }
}


export const excluirCliente = async (clienteID: number) => {
    try {
        console.log("Excluindo cliente com ID:", clienteID);

        // Busca o cliente utilizando 'clienteID' como chave
        const cliente = await clienteRepository.findOneByOrFail({ clienteID: clienteID });

        if (!cliente) {
            console.log("Cliente não encontrado!");
            return { status: 404, message: "Cliente não encontrado!" };
        }

        console.log("Cliente encontrado:", cliente);

        // Remove os endereços associados ao cliente
        const endereco = await enderecoRepository.findOneBy({ cliente: cliente.clienteID });
        if (endereco) {
            console.log("Removendo endereço:", endereco);
            await enderecoRepository.remove(endereco);
        }

        // Remove os documentos associados ao cliente
        const documento = await documentoRepository.findOneBy({ cliente: cliente.clienteID });
        if (documento) {
            console.log("Removendo documento:", documento);
            await documentoRepository.remove(documento);
        }

        // Remove os telefones associados ao cliente
        const telefone = await telefoneRepository.findOneBy({ cliente: cliente.clienteID });
        if (telefone) {
            console.log("Removendo telefone:", telefone);
            await telefoneRepository.remove(telefone);
        }

        // Remove os dependentes associados ao cliente
        const dependentes = await dependenteRepository.findBy({ cliente: cliente.clienteID });
        if (dependentes.length > 0) {
            console.log("Removendo dependentes:", dependentes);
            await dependenteRepository.remove(dependentes);
        }

        // Remove o cliente
        await clienteRepository.remove(cliente);

        console.log("Cliente excluído com sucesso!");

        return { status: 200, message: "Cliente excluído com sucesso!" };

    } catch (error) {
        console.log("Erro ao excluir cliente:", error.message);
        return { status: 500, message: error.message };
    }
};


export const listarClientes = async () => {
    try {
        const clientes = await clienteRepository.find();
        console.log(clientes);
        return { status: 200, message: clientes };
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
}

export const listarDocumentos = async () => {
    try {
        const documentos = await documentoRepository.find();
        console.log(documentos);
        return { status: 200, message: documentos };
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
}

export const listarEnderecos = async () => {
    try {
        const enderecos = await enderecoRepository.find();
        console.log(enderecos);
        return { status: 200, message: enderecos };
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
}

export const listarDependentes = async () => {
    try {
        const dependentes = await dependenteRepository.find();
        console.log(dependentes);
        return { status: 200, message: dependentes };
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
}

export const listarTelefones = async () => {
    try {
        const telefones = await telefoneRepository.find();
        console.log(telefones);
        return { status: 200, message: telefones };
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
}

export const editarCliente = async (clienteID: number, nome: string, nomeSocial: string, dataNascimento: string, rua: string, bairro: string, cidade: string, estado: string, cep: string, ddd: string, numero: string, rg: string, cpf: string, passaporte: string) => {
    try {
        const cliente = await clienteRepository.findOneBy({ clienteID: clienteID });

        if (!cliente) {
            return { status: 404, message: "Cliente não encontrado!" };
        }

        if (await documentoRepository.findOneBy({ cpf: cpf })) {
            return { status: 400, message: "CPF já cadastrado!" };
        }

        if (await documentoRepository.findOneBy({ rg: rg })) {
            return { status: 400, message: "RG já cadastrado!" };
        }

        if (await documentoRepository.findOneBy({ passaporte: passaporte })) {
            return { status: 400, message: "Passaporte já cadastrado!" };
        }

        cliente.nome = nome;
        cliente.nomeSocial = nomeSocial;
        cliente.dataNascimento = dataNascimento;
        await clienteRepository.save(cliente);

        const endereco = await enderecoRepository.findOneBy({ cliente: cliente.clienteID });
        endereco.rua = rua;
        endereco.bairro = bairro;
        endereco.cidade = cidade;
        endereco.estado = estado;
        endereco.cep = cep;
        await enderecoRepository.save(endereco);

        const documento = await documentoRepository.findOneBy({ cliente: cliente.clienteID });
        documento.rg = rg;
        documento.cpf = cpf;
        documento.passaporte = passaporte;
        await documentoRepository.save(documento);

        const telefone = await telefoneRepository.findOneBy({ cliente: cliente.clienteID });
        telefone.ddd = ddd;
        telefone.numero = numero;
        await telefoneRepository.save(telefone);
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
    return { status: 200, message: "Cliente editado com sucesso!" };
}