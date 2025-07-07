/// <reference types="vite/client" />
// This provides types for the Vite-injected env variables on import.meta.env
// See https://vite.dev/guide/features.html#client-types

export interface Offer {
  id: number;
  title: string;
  description: string;
  location: string;
  company: string;
  date_of_creation: string;
  skills?: string;
  count: number;
  status?: "open" | "closed";
	favorites: string
}

export interface User {
	id: number,
	firstname: string,
	lastname: string,
	email: string,
	password: string,
	role: string,
	cv: string,
	address: string,
	token: string,
}