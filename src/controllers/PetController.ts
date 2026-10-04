import { Request, Response } from 'express';
import { Pet } from '../models/Pet';

export class PetController {
  // Lista todos os pets
  public static async index(req: Request, res: Response): Promise<Response> {
    try {
      const pets = await Pet.findAll({
        attributes: ['id', 'nome', 'especie', 'idade', 'adotado', 'createdAt', 'updatedAt'],
      });

      return res.status(200).json(pets);
    } catch (error: unknown) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido';

      return res.status(500).json({ erro: 'Erro ao listar pets', detalhe: mensagem });
    }
  }

  // Busca um pet por ID
  public static async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ erro: 'O ID informado deve ser um numero valido.' });
      }

      const pet = await Pet.findByPk(id, {
        attributes: ['id', 'nome', 'especie', 'idade', 'adotado', 'createdAt', 'updatedAt'],
      });

      if (!pet) {
        return res.status(404).json({ erro: 'Pet não encontrado.' });
      }

      return res.status(200).json(pet);
    } catch (error: unknown) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido';

      return res.status(500).json({ erro: 'Erro ao buscar pet', detalhe: mensagem });
    }
  }

  // Cadastra um novo pet
  public static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, especie, idade, adotado } = req.body;

      if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ erro: 'O campo nome é obrigatório.' });
      }

      if (!especie || typeof especie !== 'string' || especie.trim() === '') {
        return res.status(400).json({ erro: 'O campo especie é obrigatório.' });
      }

      if (idade === undefined || typeof idade !== 'number' || idade < 0) {
        return res.status(400).json({ erro: 'O campo idade deve ser um numero valido.' });
      }

      const novoPet = await Pet.create({
        nome: nome.trim(),
        especie: especie.trim(),
        idade,
        adotado: typeof adotado === 'boolean' ? adotado : false,
      });

      return res.status(201).json({
        id: novoPet.id,
        nome: novoPet.nome,
        especie: novoPet.especie,
        idade: novoPet.idade,
        adotado: novoPet.adotado,
        createdAt: novoPet.createdAt,
        updatedAt: novoPet.updatedAt,
      });
    } catch (error: unknown) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido';

      return res.status(500).json({ erro: 'Erro ao cadastrar pet', detalhe: mensagem });
    }
  }

  // Atualiza um pet existente
  public static async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ erro: 'O ID informado deve ser um numero valido.' });
      }

      const { nome, especie, idade, adotado } = req.body;

      const pet = await Pet.findByPk(id);

      if (!pet) {
        return res.status(404).json({ erro: 'Pet não encontrado.' });
      }

      if (nome !== undefined) {
        if (typeof nome !== 'string' || nome.trim() === '') {
          return res.status(400).json({ erro: 'O campo nome deve ser um texto valido.' });
        }

        pet.nome = nome.trim();
      }

      if (especie !== undefined) {
        if (typeof especie !== 'string' || especie.trim() === '') {
          return res.status(400).json({ erro: 'O campo especie deve ser um texto valido.' });
        }

        pet.especie = especie.trim();
      }

      if (idade !== undefined) {
        if (typeof idade !== 'number' || idade < 0) {
          return res.status(400).json({ erro: 'O campo idade deve ser um numero valido.' });
        }

        pet.idade = idade;
      }

      if (adotado !== undefined) {
        if (typeof adotado !== 'boolean') {
          return res.status(400).json({ erro: 'O campo adotado deve ser um booleano.' });
        }

        pet.adotado = adotado;
      }

      await pet.save();

      return res.status(200).json({
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        idade: pet.idade,
        adotado: pet.adotado,
        createdAt: pet.createdAt,
        updatedAt: pet.updatedAt,
      });
    } catch (error: unknown) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido';

      return res.status(500).json({ erro: 'Erro ao atualizar pet', detalhe: mensagem });
    }
  }

  // Remove um pet
  public static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ erro: 'O ID informado deve ser um numero valido.' });
      }

      const pet = await Pet.findByPk(id);

      if (!pet) {
        return res.status(404).json({ erro: 'Pet não encontrado.' });
      }

      await pet.destroy();

      return res.status(204).send();
    } catch (error: unknown) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido';

      return res.status(500).json({ erro: 'Erro ao excluir pet', detalhe: mensagem });
    }
  }
}
