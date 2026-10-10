"use strict";

let incidents = [
    {
        id:"INC-001",
        title: "Bache frente a la universidad",
        category: "bache",
        description: "Bache profundo que dificulta el paso de vehículos",
        status: "pendiente",
        location:{
            type: "Point",
            coordinates: [-101.6812, 21.1248]
        },
        cratedAT: "2026-01-15T12:00:00Z",
        upcatedAT: "2026-01-15T12:00:00Z"
    },
    {
        id:"INC-002",
        title: "Luminaría sin funcionar",
        category: "alumbrado",
        description: "La calle permanece oscura durante la noche",
        status: "atendido",
        location:{
            type: "Point",
            coordinates: [-101.6732, 21.1165]
        },
        cratedAT: "2026-01-16T09:30:00Z",
        upcatedAT: "2026-01-16T09:30:00Z"
    },
    {
        id:"INC-003",
        title: "Acumulación de basura",
        category: "basura",
        description: "La calle está llena de basura que no se ha recogido",
        status: "atendido",
        location:{
            type: "Point",
            coordinates: [-101.6741, 21.1271]
        },
        cratedAT: "2026-01-17T15:45:00Z",
        upcatedAT: "2026-01-17T15:45:00Z"
    },
    {
        id:"INC-004",
        title: "Fuga de agua en la calle principal",
        category: "fuga",
        description: "Se ha detectado una fuga de agua que está afectando el tránsito",
        status: "pendiente",
        location:{
            type: "Point",
            coordinates: [-101.6740, 21.1165]
        },
        cratedAT: "2026-01-18T11:15:00Z",
        upcatedAT: "2026-01-18T11:15:00Z"
    },
    {
        id:"INC-005",
        title: "Accidente Vehícular",
        category: "accidente",
        description: "Choque entre dos vehículos en la intersección, causando congestión en la zona",
        status: "pendiente",
        location:{
            type: "Point",
            coordinates: [-101.6852, 21.1278]
        },
        cratedAT: "2026-01-19T14:30:00Z",
        upcatedAT: "2026-01-19T14:30:00Z"
    }
]