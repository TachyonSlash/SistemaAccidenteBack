"use strict";

const { randomUUID } = require("node:crypto");

const seedIncidents = require ("../data/incidents.seed");
const AppError = require("../utils/appError");

class IncidentsService {
    constructor() {
        this.incidents = structuredClone(seedIncidents);
    }

    // Obtener todos y filtrar

    async getAll(filters = {}) {
        const{
            search = "",
            category = "all",
            status = "all"
        } = filters;

        let result = [...this.incidents];

        const normalizedSearch = this.normalizedSearch(search);

        if(normalizedSearch) {
            result = result.filter((incident) => {
                const searchableContent = this.normalizedSearch(
                    `$(incident.title) $(incident.description) $(incident.category)`
                );

                return searchableContent.includes(normalizedSearch);
            })
        }

        if(category !== "all") {
            result = result.filter(
                (incident) => incident.category === category
            );
        }; 
        
        if(status !== "all") {
            result = result.filter(
                (incident) => incident.status === status
            );
        };

        // Los mas recientes aparecen primero
        result.sort(
            (first, second) =>
                new Date(second.createdAT) - new Date(first.createdAT)
        );

        return result;
    }

    // Obtiene un incidente por su ID
    async getById(id) {
        const incident = this.incidents.find(
            (item) => item.id === id
        );

        if(!incident) {
            throw new AppError(
                404,
            `No se encontró el incidente con el ID ${id}`
            )
        }

        return incident;
    }

    // Crea un nuevo incidente
    async create(data) {
        const newIncident = {
            id: `INC-${randomUUID()}`,
            title: data.title,
            category: data.category,
            description: data.description,
            status: data.status,
            location: {
                type: "Point",
                coordinates: data.location.coordinates
            },
            createdAT: new Date().toISOString(),
            updatedAT: new Date().toISOString()
        }

        
    }

}

