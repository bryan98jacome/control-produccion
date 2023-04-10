import { collection, doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import swal from 'sweetalert';

export async function createProduct(nombre, codigo) {
    try {
        const docRef = doc(collection(db, "products"), codigo);
        await setDoc(docRef, {
            name: nombre,
            code: codigo,
            cant: 0
        });
        swal({
            title: "Buen trabajo!", text: "Se añadio el producto con exito!",
            icon: "success", button: "OK"
        }).then((value) => { window.location.reload(); });
    } catch (error) { console.log(error); }
}

export async function updateProduction(date, report) {
    try {
        const docRef = doc(collection(db, "reports"), date[0].date);
        await setDoc(docRef, { date, report });
        swal({
            title: "Buen trabajo!", text: "Reporte generado exitosamente!",
            icon: "success", button: "OK"
        }).then((value) => { window.location.reload(); });
    } catch (error) { console.log(error); }
}

export async function updateProduct(stock) {
    try {
        stock.map(async producto => {
            const docRef = doc(collection(db, "products"), producto.code);
            await updateDoc(docRef, { cant: increment(producto.cant) })
        });
    } catch (error) { console.log(error); }
}