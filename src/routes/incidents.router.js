"use strict";

const express = require("express");

const IncidentService = require("../services/incidents.service");

const router = express.Router();
const Service = new IncidentService();

router.get("/", async (req, res, next) => {
    const filters = {
        search: req.query.search,
        category: req.query.category,
        status: req.query.status
    };

    const incidents = await Service.getAll(filters);

    res.status(200).json({
        count: incidents.length,
        data: incidents
    });
});

router.get("/geojson", async(req, res) => {
    const filters = {
        search: req.query.search,
        category: req.query.category,
        status: req.query.status
    };

    const geoJSON = await Service.getGeoJson(filters);

    res.status(200).json(geoJSON)
});

router.get("/:id", async (req, res) => {
    const { id } = req.params

    const incident = await Service.getById(id);

    res.status(200).json({data: incident})
})

module.exports = router;