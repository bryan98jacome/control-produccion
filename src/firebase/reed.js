import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export async function existProduct(nombre, codigo) {
    const products = [];
    const docsRef = collection(db, "products");
    const q = query(docsRef, where("name", "==", nombre));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        products.push(doc.data());
    });
    const q2 = query(docsRef, where("code", "==", codigo));
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
        products.push(doc.data());
    });
    return products.length > 0 ? false : true;
}

export async function getProducts() {
    const productos = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        productos.push(doc.data());
    });
    return productos;
}

export async function getReport(date) {
    const report = [];
    try {
        const querySnapshot = await getDocs(collection(db, "reports"));
        querySnapshot.forEach((doc) => {
            if (doc.data().date[0].date === date) {
                report.push(doc.data().report);
            }
        });
        return report;
    } catch (error) { console.log(error); }
}