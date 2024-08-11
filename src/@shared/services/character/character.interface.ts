import { Character } from "src/@shared/models/character";
import { InfoPagination } from "../services.interface";

export interface SearchCharacter {
  info: InfoPagination,
  results: Character[]
}