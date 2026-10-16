"use strict";

const { randomUUID } = require("node:crypto");

const seedIncidents = require("../data/incident.seed");
const AppError = require("../utils/appError");
const { title } = require("node:process");

class IncidentsService {

    constructor(){
        this.incidents = structuredClone(seedIncidents);
    }

    //  obtener todos y filtrar
    async getAll( filters = {}){
        const {
            search = "",
            category = "all",
            status = "all"
        } = filters;

        let result = [...this.incidents];

        const normalizedSearch = this.normalizeText(search);

        if (normalizedSearch) {
            result = result.filter(incident => {
                const searchableContent = this.normalizeText(
                    `${incident.title} ${incident.description} ${incident.category}`
                );
                return searchableContent.includes(normalizedSearch);
            });
        }

        if (status !== "all") {
            result = result.filter(
                (incident) => incident.status === status
            );
        }

        if (category !== "all") {
            result = result.filter(
                (incident) => incident.category === category
            );
        }

        // los mas recientes aparecen primero
        result.sort(
            (first, second) => 
                new Date(second.createdAt) - new Date(first.createdAt)
        );

        return result;
    }

    async getById(id) {

        if (!id) {
            throw new AppError(400, "El id del incidente es requerido");
        }

        const incident = this.incidents.find((incident) => incident.id === id);

        if (!incident) {
            throw new AppError(404, "Incidente no encontrado");
        }

        return incident;
    }

    async createIncident(data) {

        const currentDate = new Date().toISOString();

        const newIncident = {
            id: `INC-${randomUUID()}`,
            title: data.title,
            category: data.category,
            description: data.description.trim(),
            status: data.status,
            location: {
                type: "Point",
                coordinates: [
                    Number(data.longitude),
                    Number(data.latitude)
                ]
            },
            createdAt: currentDate,
            updatedAt: currentDate

        }

        this.incidents.push(newIncident)

        return newIncident;
    }

     async update(id, change){
        const index = this.incidents.findIndex(
            (incident) => incident.id === id
        );

        if (index === -1) {
            throw new AppError(404, `no se encontro incidente con id ${id}`)
        }

        const currentIncident = this.incidents[index];

        const currentLongitude = currentIncident.location.coordinates[0];
        const currentLatitude = currentIncident.location.coordinates[1];
        
        const updateLongitude = change.longitude !== undefined
            ? Number(change.longitude) : currentLongitude;
        
        const updateLatitude = change.location !== undefined
            ? Number(change.latitude) : currentLatitude;

        const updateIncident = {
            ...currentIncident,

            ...(change.title !== undefined && {
                title: change.title.trim()
            }),

            location: {
                type: 'Point',
                coordinates: [updateLongitude, updateLatitude]
            },

            updatedAt: new Date().toISOString()
        }

        this.incidents[index] = updateIncident;

        return updateIncident;
     }

    async getGeoJson(filters = {}) {
        const incidents = await this.getAll(filters);

        return{
            type: "FeaturedCollection",
            features: incidents.map((incident) => ({
                type: "Feature",
                properties: {
                    id: incident.id,
                    title: incident.title,
                    category: incident.category,
                    description: incident.description,
                    status: incident.status,
                    createdAT: incident.createdAT,
                    updatedAT: incident.updatedAT
                },
                geometry: incident.location
            }))
        }
    }

    normalizeText(text) {
        return String(text)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

}

module.exports = IncidentsService;
