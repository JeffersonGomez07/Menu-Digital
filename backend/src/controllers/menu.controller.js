import pool from "../config/db.js";

export const getmenuBySlug = async (req, res) => { // GET /api/menu/:slug
    try {
        //obtener el slug desde la URL
        const { slug } = req.params;

        console.log("SLUG RECIBIDO EN CONTROLLER:", slug);

        //buscamos el negocio por su slug
        const businessResult = await pool.query( // await es para esperar a que la promesa se resuelva
        `
        SELECT id, name, address, phone, logo_url
        FROM businesses
        WHERE slug = $1
        `,
        [slug] // el slug se pasa como parametro para evitar inyeccion SQL
        );

    // si no existe el negocio, retornamos 404
    if (businessResult.rows.length === 0) { 
        return res.status(404).json({
             message: "Negocio no encontrado",
    });
    }

    // guardamos el negocio encontrado
    const business = businessResult.rows[0];

    //buscamos las categorias del negocio
    const categoriesResult = await pool.query(
        `
        SELECT id, name\
        FROM categories\
        WHERE business_id = $1
        ORDER BY created_at
        `,
        [business.id] // pasamos el id del negocio como parametro
    );

    //creamos un arreglo para las categorias con sus productos
    const categoriesWithProducts = [];

    //recorremos cada categoria
    for (const category of categoriesResult.rows) {
        //buscamos los productos de la categoria actual
        const productsResult = await pool.query(
            `
            SELECT id, name, description, price, image_url
            FROM products
            WHERE category_id = $1
            ORDER BY created_at
            `,
            [category.id]
        );
    //agregamos la categoria con sus productos
    categoriesWithProducts.push({ //push agrega un nuevo elemento al final del arreglo
        id: category.id,
        name: category.name,
        products: productsResult.rows,
    });
    }
    
    //enviamos la respuesta final
    return res.json({
        business,
        categories: categoriesWithProducts,
    });

    } catch (error) {
        console.error("Error al obtener el menu por slug:", error);
        return res.status(500).json({
            message: "Error del servidor",
        });
    }
    
};