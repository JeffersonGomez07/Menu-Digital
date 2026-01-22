export const canChangeStatus = (current, target) => {
    const rules = {
        pendiente: ["confirmado", "cancelado"],
        confirmado: ["preparacion", "cancelado"],
        preparacion: ["enviado", "cancelado"],
        enviado: [],
        cancelado: []
    };

    return rules[current]?.includes(target);
};
