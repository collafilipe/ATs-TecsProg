import { AppDataSource } from "../../data-source";
import { Quarto } from "../../model/acomodacao/quartos";

export const quartoRepository = AppDataSource.getRepository(Quarto);

export const listarQuartos = async () => {
    try {
        const quartos = await quartoRepository.find();
        return { status: 200, message: quartos };
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
}

export const cadastrarQuarto = async (tipo: string, quartoStatus: string) => {
    try {
        const quarto = new Quarto(tipo, quartoStatus);
        await quartoRepository.save(quarto);
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
    return { status: 200, message: "Quarto cadastrado com sucesso!" };
}

export const excluirQuarto = async (quartoID: number) => {
    try {
        const quarto = await quartoRepository.findOneBy({ quartoID: quartoID });

        if (!quarto) {
            return { status: 404, message: "Quarto não encontrado!" };
        }

        await quartoRepository.remove(quarto);
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
    return { status: 200, message: "Quarto excluído com sucesso!" };
}

export const editarQuarto = async (quartoID: number, tipo: string, quartoStatus: string) => {
    try {
        const quarto = await quartoRepository.findOneBy({ quartoID: quartoID });

        if (!quarto) {
            return { status: 404, message: "Quarto não encontrado!" };
        }

        quarto.tipo = tipo;
        quarto.quartoStatus = quartoStatus;
        await quartoRepository.save(quarto);
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
    return { status: 200, message: "Quarto editado com sucesso!" };
}