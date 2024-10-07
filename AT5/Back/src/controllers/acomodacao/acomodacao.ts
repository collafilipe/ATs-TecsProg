import { AppDataSource } from "../../data-source";
import { Quarto } from "../../model/acomodacao/quartos";
import { Acomodacao } from "../../model/acomodacao/acomodacao";
import { Cliente } from "../../model/cliente/cliente";

export const quartoRepository = AppDataSource.getRepository(Quarto);
export const acomodacaoRepository = AppDataSource.getRepository(Acomodacao);
export const clienteRepository = AppDataSource.getRepository(Cliente);

export const listarAcomodacoes = async () => {
    try {
        const acomodacoes = await acomodacaoRepository.find({ relations: ["cliente", "quarto"] });
        return { status: 200, message: acomodacoes };
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
}

export const cadastrarAcomodacao = async (clienteID: number, quartoID: number) => {
    try {
        const quarto = await quartoRepository.findOneBy({ quartoID: quartoID });
        const cliente = await clienteRepository.findOneBy({ clienteID: clienteID });

        if (!quarto) {
            return { status: 404, message: "Quarto não encontrado!" };
        }

        if (!cliente) {
            return { status: 404, message: "Cliente não encontrado!" };
        }

        const acomodacao = new Acomodacao(cliente, quarto);
        await acomodacaoRepository.save(acomodacao);

        // Update the status of the room to "ocupado"
        quarto.quartoStatus = "Ocupado";
        await quartoRepository.save(quarto);

        return { status: 200, message: "Acomodação cadastrada com sucesso!" };
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
}

export const excluirAcomodacao = async (acomodacaoID: number, quartoID: number) => {
    try {
        // Busca a acomodação pelo ID
        const acomodacao = await acomodacaoRepository.findOneBy({ acomodacaoID: acomodacaoID });

        // Verifica se a acomodação existe
        if (!acomodacao) {
            return { status: 404, message: "Acomodação não encontrada!" };
        }

        const quarto = await quartoRepository.findOneBy({ quartoID: quartoID }); // Obtém o quarto associado à acomodação

        // Remove a acomodação
        await acomodacaoRepository.remove(acomodacao);

        // Atualiza o status do quarto para "Disponível"
        if (quarto) {
            quarto.quartoStatus = "Disponível"; // Muda o status do quarto
            await quartoRepository.save(quarto); // Salva a alteração
        }

        // Retorna uma resposta de sucesso
        return { status: 200, message: "Acomodação excluída com sucesso!" };
    } catch (error) {
        // Retorna um erro caso algo falhe
        return { status: 500, message: error.message };
    }
}

export const editarAcomodacao = async (acomodacaoID: number, clienteID: number, quartoID: number) => {
    try {
        const acomodacao = await acomodacaoRepository.findOneBy({ acomodacaoID: acomodacaoID });
        const cliente = await clienteRepository.findOneBy({ clienteID: clienteID });
        const quarto = await quartoRepository.findOneBy({ quartoID: quartoID });

        if (!acomodacao) {
            return { status: 404, message: "Acomodação não encontrada!" };
        }

        if (!cliente) {
            return { status: 404, message: "Cliente não encontrado!" };
        }

        if (!quarto) {
            return { status: 404, message: "Quarto não encontrado!" };
        }

        acomodacao.cliente = cliente;
        acomodacao.quarto = quarto;
        await acomodacaoRepository.save(acomodacao);
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
    return { status: 200, message: "Acomodação editada com sucesso!" };
}