import Image from "next/image";
import "./menu.css";
import MenuPageClient from "./menuPageClient";


export default async function MenuPage({ params }) { // params viene de la URL, en este caso el slug del negocio
  const { slug } = await params; 

  await new Promise(r => setTimeout(r, 1500));

  const res = await fetch( // llamada al backend para obtener el menu del negocio
    `http://localhost:4000/api/menu/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <h1>Menú no encontrado</h1>;
  }

  const data = await res.json(); // datos del negocio y su menu

  return <MenuPageClient data={data} />;

}
