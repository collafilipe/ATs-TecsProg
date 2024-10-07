import { AppDataSource } from "../../data-source";
import { Cliente } from "../../model/cliente/cliente";
import { Dependente } from "../../model/cliente/dependente";
import { Documento } from "../../model/cliente/documento";
import { Endereco } from "../../model/cliente/endereco";
import { Telefone } from "../../model/cliente/telefone";

export const dependenteRepository = AppDataSource.getRepository(Dependente);
export const clienteRepository = AppDataSource.getRepository(Cliente);
export const documentoRepository = AppDataSource.getRepository(Documento);
export const enderecoRepository = AppDataSource.getRepository(Endereco);
export const telefoneRepository = AppDataSource.getRepository(Telefone);

export const listarDependentes = async () => {
    try {
        const dependentes = await dependenteRepository.find();
        return { status: 200, message: dependentes };
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
}

export const cadastrarCliente = async (nome: string, nomeSocial: string, dataNascimento: string, ddd: string, numero: string, rg: string, cpf: string, passaporte: string, clienteID: number) => {

    try {
        if (await documentoRepository.findOneBy({ cpf: cpf })) {
            return { status: 400, message: "CPF já cadastrado!" };
        }

        if (await documentoRepository.findOneBy({ rg: rg })) {
            return { status: 400, message: "RG já cadastrado!" };
        }

        if (await documentoRepository.findOneBy({ passaporte: passaporte })) {
            return { status: 400, message: "Passaporte já cadastrado!" };
        }

        const cliente = await clienteRepository.findOneBy({ clienteID: clienteID });

        if (!cliente) {
            return { status: 404, message: "Cliente não encontrado!" };
        }
        const dependente = new Dependente(nome, nomeSocial, dataNascimento, cliente.clienteID);
        await dependenteRepository.save(dependente);

        const endereco = await enderecoRepository.findOneBy({ cliente: clienteID });
        if (!endereco) {
            return { status: 404, message: "Endereço do cliente não encontrado!" };
        }
        const enderecoNovo = new Endereco(endereco.rua, endereco.bairro, endereco.cidade, endereco.estado, endereco.cep, null, dependente.dependenteID);
        await enderecoRepository.save(enderecoNovo);
        
        const documento = new Documento(rg, cpf, passaporte, null, dependente.dependenteID);
        await documentoRepository.save(documento);
        const telefone = new Telefone(ddd, numero, null, dependente.dependenteID);
        await telefoneRepository.save(telefone);
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
    return { status: 200, message: "Cliente cadastrado com sucesso!" };
}

export const excluirDependente = async (dependenteID: number) => {
    try {
        const dependente = await dependenteRepository.findOneBy({ dependenteID: dependenteID });

        if (!dependente) {
            return { status: 404, message: "Dependente não encontrado!" };
        }

        const endereco = await enderecoRepository.findOneBy({ dependente: dependente.dependenteID });
        if (endereco) {
            await enderecoRepository.remove(endereco);
        }

        const documento = await documentoRepository.findOneBy({ dependente: dependente.dependenteID });

        if (documento) {
            await documentoRepository.remove(documento);
        }
        await dependenteRepository.remove(dependente);

        const telefone = await telefoneRepository.findOneBy({ dependente: dependente.dependenteID });

        if (telefone) {
            await telefoneRepository.remove(telefone);
        }

        await dependenteRepository.remove(dependente);
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
    return { status: 200, message: "Dependente excluído com sucesso!" };
}

export const editarDependente = async (dependenteID: number, nome: string, nomeSocial: string, dataNascimento: string, ddd: string, numero: string, rg: string, cpf: string, passaporte: string, clienteID: number) => {
    try {
        const dependente = await dependenteRepository.findOneBy({ dependenteID: dependenteID });
        const cliente = await clienteRepository.findOneBy({ clienteID: clienteID });

        if (!dependente) {
            return { status: 404, message: "Dependente não encontrado!" };
        }

        if (!cliente) {
            return { status: 404, message: "Cliente não encontrado!" };
        }

        dependente.nome = nome;
        dependente.nomeSocial = nomeSocial;
        dependente.dataNascimento = dataNascimento;
        dependente.cliente = cliente.clienteID;
        await dependenteRepository.save(dependente);

        const endereco = await enderecoRepository.findOneBy({ dependente: dependente.dependenteID });
        if (!endereco) {
            return { status: 404, message: "Endereço do dependente não encontrado!" };
        }
        endereco.rua = endereco.rua;
        endereco.bairro = endereco.bairro;
        endereco.cidade = endereco.cidade;
        endereco.estado = endereco.estado;
        endereco.cep = endereco.cep;
        endereco.cliente = null;
        endereco.dependente = dependente.dependenteID;
        await enderecoRepository.save(endereco);

        const documento = await documentoRepository.findOneBy({ dependente: dependente.dependenteID });
        if (!documento) {
            return { status: 404, message: "Documento do dependente não encontrado!" };
        }
        documento.rg = rg;
        documento.cpf = cpf;
        documento.passaporte = passaporte;
        documento.cliente = null;
        documento.dependente = dependente.dependenteID;
        await documentoRepository.save(documento);

        const telefone = await telefoneRepository.findOneBy({ dependente: dependente.dependenteID });
        if (!telefone) {
            return { status: 404, message: "Telefone do dependente não encontrado!" };
        }
        telefone.ddd = ddd;
        telefone.numero = numero;
        telefone.cliente = null;
        telefone.dependente = dependente.dependenteID;
        await telefoneRepository.save(telefone);
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
    return { status: 200, message: "Dependente editado com sucesso!" };
}